import request from 'supertest';
import { server, app} from '../../app';
import MOCKDBCONFIG from '../mocks/dbConfig.mock'; 
import { openConnectionDB, closeConnectionDB } from '../../src/config/dbRoperoSolidario';
import UserModelMock from '../mocks/userModel.mock';
import mysql,{Connection} from 'mysql2/promise';
import User from '../../src/types/userTypes';
import { DBCONFIG } from '../../src/config/dbConfig';

describe("CRUD Users Test",() =>{
            
    let connection: Promise<Connection>;
    let response: request.Response;
    connection=  openConnectionDB(DBCONFIG);

    describe("GET /Users", () =>{
       
        
           
        beforeEach(async() =>{
           
            
            response = await request(app).get('/users').send();
                
        })
        test('Should return a response with status 200 and type json, when I send a Get request', async() => {
               
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');

        })
        test("Should return all Users",async() => {
            
            expect(response.body).toBeInstanceOf(Object);
                 
        })
        afterAll(async()=> {
            const realConnection = await connection; 
            closeConnectionDB(realConnection);
               
        })
    })
    describe("GET /Users by ID", () =>{
       
        connection=  openConnectionDB(DBCONFIG);
           
        beforeEach(async() =>{
           
            
            response = await request(app).get('/users/62cdf82e-7fd2-11ee-aca4-a85e45c11908').send();
                
        })
        test('Should return a response with status 200 and type json, when I send a Get by ID request', async() => {
               
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })
        test("Should return a User",async() => {
            
            expect(response.body).toBeInstanceOf(Object);
                 
        })
        
        
    })
    afterAll(async()=> {
          
        server.close();
        const realConnection = await connection; 
        closeConnectionDB(realConnection);
           
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
   
       
      
   
   })