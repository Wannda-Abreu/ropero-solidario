import request from 'supertest';
import { server, app} from '../../app';
import UserModel from '../../src/models/userModel';
import User from '../../src/types/userTypes';
import db from '../../src/config/dbConfig.sequelize';

describe("CRUD Users Test",() =>{
            
    let response: request.Response;

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
    })
    describe("GET /Users by ID", () =>{
       
           
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
    afterAll(async () => {
        server.close();
        db.close();
    });           
    })
    describe('POST /users', () => {
    
        const newUser = {  
            user_name: "test",
            surname: "test",
            user_password: "test",
            nationality: "test",
            family_members_id: null,
            zip_code_id: null,
            reference_center_id: null
            
        }
    
        const wrongUser = {
            wrong_field: 2.75,
            wrong_field2: "pesa"
        }
    
        test('Should return a response with status 200 and type json when a correct user is added', async () => {
            const response = await request(app).post('/users').send(newUser);
            expect(response.status).toBe(201);
            expect(response.headers['content-type']).toContain('json');
        });
    
        test('Should return a message user created successfully', async () => {
            const response = await request(app).post('/users').send(newUser);
            expect(response.body.message).toContain("The User has been created successfully!");
        });
    
        test('Should return a message insertion error if post wrong user', async () => {
            const response = await request(app).post('/users').send(wrongUser);
            expect(response.status).toBe(400);
            expect(response.body.message).toContain("Invalid data. All fields are required.");
        });
    
        // afterAll(async () => {
        //     await UserModel.eliminateByName('test');
        // });
    });