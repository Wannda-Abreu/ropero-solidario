import request from 'supertest';
import { server, app} from '../../app';
import UserModel from '../../src/models/userModel';
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
           
            
            response = await request(app).get('/users/6ec8c720-802f-11ee-aca4-a85e45c11908').send();
                
        });
        test('Should return a response with status 200 and type json, when I send a Get by ID request', async() => {
               
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        test("Should return a User",async() => {
            
            expect(response.body).toBeInstanceOf(Object);
                 
        });
        
        
    });
          
   
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
    
        afterAll(async () => {
            await UserModel.eliminateByName('test');
        });
    });

    describe('UPDATE /users', () => {
    
        const updatedUser = {  
            user_name: "test-dontEliminate",
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
    
        test('Should return a response with status 200, type json and a user created successfully! message when a correct user is updated', async () => {
            const response = await request(app).put('/users/6ec8c720-802f-11ee-aca4-a85e45c11908').send(updatedUser);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body.message).toContain('The user has been updated successfully!');
        });
    
        test('Should return a message insertion error if updated wrong user', async () => {
            const response = await request(app).put('/users/6ec8c720-802f-11ee-aca4-a85e45c11908').send(wrongUser);
            expect(response.status).toBe(400);
            expect(response.body.message).toContain("Invalid data. All fields are required.");
        });
    
        afterAll(async () => {
            await UserModel.eliminateByName('test');
        });
    });

    describe('DELETE/ User', () => {
        const newUser = {  
            user_name: "test",
            surname: "test",
            user_password: "test",
            nationality: "test",
            family_members_id: null,
            zip_code_id: null,
            reference_center_id: null
            
        }
        
        test('Should return a response with status 200, type json and a user created successfully! message when a correct user is updated', async () => {

            await request(app).post('/users').send(newUser);
            const user = await UserModel.findByName('test');

            if(user!= null){
                let {user_id,user_name, surname, user_password, nationality, family_members_id, zip_code_id, reference_center_id} = user[0];
                const response = await request(app).delete(`/users/${user_id}`).send();
                expect(response.status).toBe(200);
                expect(response.headers['content-type']).toContain('json');
                expect(response.body.message).toContain('The User has been Eliminated!');
            }
           
        });

        
    })

    
    afterAll(async () => {
        server.close();
        db.close();
    });   
})  