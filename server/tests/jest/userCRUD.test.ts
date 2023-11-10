import request from 'supertest';
import { server, app} from '../../app';
import MOCKDBCONFIG from '../mocks/dbConfig.mock'; 
import { openConnectionDB, closeConnectionDb } from '../../src/config/dbRoperoSolidario';
import UserModelMock from '../mocks/userModel.mock';
import mysql,{Connection} from 'mysql2/promise';
import User from '../../src/types/userTypes';
import { DBCONFIG } from '../../src/config/dbConfig';

describe("CRUD Users Test",() =>{
            
    let connection: Promise<Connection>;
    let response: request.Response;

    describe("GET /Users", () =>{
       
        
           
        beforeEach(async() =>{
           
            connection=  openConnectionDB(DBCONFIG);
            response = await request(app).get('/user').send();
                
        })
        test('Should return a response with status 200 and type json, when I send a Get request', async() => {
               
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');

        })
        test("Should return all Users",async() => {
            
            expect(response.body).toBeInstanceOf(Object);
                 
        })
    })
    describe("GET /Users by ID", () =>{
       
        
           
        beforeEach(async() =>{
           
            connection=  openConnectionDB(DBCONFIG);
            response = await request(app).get('/user/5d0d9dd7-7e8b-11ee-9707-a85e45c11908').send();
                
        })
        test('Should return a response with status 200 and type json, when I send a Get by ID request', async() => {
               
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })
        test("Should return a User",async() => {
            
            expect(response.body).toBeInstanceOf(Object);
                 
        })
    })
          
               
    // })
       
    //     describe('POST /products',() =>{ 
    
    //        const newProduct = {
    //            product_name: "test",
    //            product_description: "test",
    //            price: 2,
    //            stock: 1
    //        }
   
    //        const wrongProduct = {
    //            wrong_field: 2.75,
    //            wrong_field2: "pesa"
    //        }
   
    //        test('Should return a response with status 200 and type json when a correct product is Added', async () =>{
    //            const response = await request(app).post('/products').send(newProduct)
    //            expect(response.status).toBe(201)
    //            expect(response.headers['content-type']).toContain('json')
    //        });
   
    //        test('Should return a message product created successfully', async () =>{
    //            const response = await request(app).post('/products').send(newProduct)
    //            expect(response.body.message).toContain("The Product has been created successfully")
    //        })
   
    //        test('Should return a message insertion error If post wrong product ', async () =>{
    //            const response = await request(app).post('/products').send(wrongProduct)
    //            expect(response.status).toBe(400);
    //            expect(response.body.message).toContain("Invalid data. All fields are required.")
    //        })
   
    //        afterAll(async () => {
    //            await UserModelMock.eliminateByName('test');
    //        }) 
   
       
        afterAll(async()=> {
        server.close();
        const realConnection = await connection; 
        closeConnectionDb(realConnection);
           
    })
   
   })