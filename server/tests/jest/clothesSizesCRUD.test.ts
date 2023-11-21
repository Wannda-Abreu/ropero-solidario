import request from 'supertest';
import { server, app } from '../../app';
import ClothesSizeModel from '../../src/models/clothesSizeModel';
import db from '../../src/config/dbConfig.sequelize';
import supertest = require('supertest');



describe("CRUD Clothes Sizes Test", () => {

    let response: request.Response;
    const newClothesSize = {
        clothes_size_id: null,
        size: "test",
        quantity: 10
    };
    const postClotheAndGetId = async () => {
        await request(app).post('/clothesSizes').send(newClothesSize);
        const clothesSize = await ClothesSizeModel.findBySize('test');

        if (clothesSize != null) {
            let {clothes_sizes_id,size, quantity} = clothesSize[0];
            return  clothes_sizes_id;
        }
    }
    

    describe("GET /ClothesSizes", () => {

        beforeEach(async () => {
            response = await request(app).get('/clothesSizes').send();
        });

        test('Should return a response with status 200 and type json when I send a Get request', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test("Should return all Clothes Sizes", async () => {
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe("GET /Clothes_Sizes by ID", () => {
        ;
        beforeEach(async () => {
            const clothes_size_id = await postClotheAndGetId()
            response = await request(app).get(`/clothesSizes/${clothes_size_id}`).send();
        });

        test('Should return a response with status 200 and type json when I send a Get by ID request', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test("Should return a Clothes Size", async () => {
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('POST /clothes_sizes', () => {


        const wrongClothesSize = {
            wrong_field: "Large",
            wrong_field2: 5
        };

        test('Should return a response with status 201 and type json when a correct clothes size is added', async () => {
            const response = await request(app).post('/clothesSizes').send(newClothesSize);
            expect(response.status).toBe(201);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Should return a message clothes size created successfully', async () => {
            const response = await request(app).post('/clothesSizes').send(newClothesSize);
            expect(response.body.message).toContain("The Clothes Size has been created successfully!");
        });

        test('Should return a message insertion error if post wrong clothes size', async () => {
            const response = await request(app).post('/clothesSizes').send(wrongClothesSize);
            expect(response.status).toBe(400);
            expect(response.body.message).toContain("Invalid data. All fields are required.");
        });

        afterAll(async () => {
          
            await ClothesSizeModel.deleteBySize('test');
        });
    });

    describe('UPDATE /clothes_sizes', () => {

        const updatedClothesSize = {
            
            size: "test",
            quantity: 15
        };

        const wrongClothesSize = {
            wrong_field: "test",
            wrong_field2: 5
        };
      
       

        test('Should return a response with status 200, type json and a clothes size updated successfully! message when a correct clothes size is updated', async () => {
            const clothes_size_id =  await postClotheAndGetId();
            const response = await request(app).patch(`/clothesSizes/${clothes_size_id}`).send(updatedClothesSize);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body.message).toContain('The clothes size has been updated successfully!');
        });

        test('Should return a message insertion error if updated wrong clothes size', async () => {
            const clothes_size_id =  await postClotheAndGetId();
            const response = await request(app).put(`/clothesSizes/${clothes_size_id}`).send(wrongClothesSize);
            expect(response.status).toBe(400);
            expect(response.body.message).toContain("Required clothes size data");
        });

        afterAll(async () => {
            
            await ClothesSizeModel.deleteBySize("test");
        });
    });

    describe('DELETE /clothesSizes', () => {

        const newClothesSize = {
               
            size: "test",
            quantity: 5
        };

        test('Should return a response with status 200, type json and a clothes size deleted successfully! message when a correct clothes size is deleted', async () => {
            await request(app).post('/clothesSizes').send(newClothesSize);
            const clothesSize = await ClothesSizeModel.findBySize('test');

            if (clothesSize != null) {
                let {clothes_sizes_id, size, quantity} = clothesSize[0];
                const response = await request(app).delete(`/clothesSizes/${clothes_sizes_id}`).send();
                expect(response.status).toBe(200);
                expect(response.headers['content-type']).toContain('json');
                expect(response.body.message).toContain('The Clothes Size has been deleted!');
            }
        });

        afterAll(async () => {
            
            await ClothesSizeModel.deleteBySize('test');
        });
    });
   

    afterAll(async () => {
        server.close();
        db.close();
    });
});