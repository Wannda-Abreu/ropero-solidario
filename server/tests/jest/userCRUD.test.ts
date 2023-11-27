import request from 'supertest';
import app from '../../app';
import server from '../../index';
import UserModel from '../../src/models/userModel';
import db from '../../src/config/dbConfig.sequelize';

describe("CRUD Users Test",() =>{
            
    let response: request.Response;

    const newUser = {  

        user_name: 'test',
        surname: "test",
        nationality: "test",
        date_of_last_report_id: null,
        family_members_id: null,
        zip_code_id: null,
        reference_center_id: null,
        appointment_id: null
        
    }
    
    const postUserAndGetId = async () => {
        await request(app).post('/users').send(newUser);
        const user = await UserModel.findByName('test');

        if (user != null) {
            console.log(user);
            let {user_id,user_name, surname, nationality, date_of_last_report_id, family_members_id, zip_code_id, reference_center_id, appointment_id} = user[0];
            return  user_id;
        }
    }

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
           
            const user_id =  await postUserAndGetId();
            response = await request(app).get(`/users/${user_id}`).send();
                
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
            expect(response.body.message).toContain("Invalid Request data. All fields are required.");
        });
    
        afterAll(async () => {
            await UserModel.eliminateByName('test');
        });
    });

    describe('UPDATE /users', () => {
    
        const updatedUser = {  
            user_name: "test",
            surname: "test",
            nationality: "test",
            date_of_last_report_id: null,
            family_members_id: null,
            zip_code_id: null,
            reference_center_id: null,
            appointment_id: null
            
        }
    
        const wrongUser = {
            wrong_field: 2.75,
            wrong_field2: "pesa"
        }
    
        test('Should return a response with status 200, type json and a user created successfully! message when a correct user is updated', async () => {
            
            const user_id =   await postUserAndGetId();
            const response = await request(app).put(`/users/${user_id}`).send(updatedUser);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body.message).toContain('The user has been updated successfully!');
        });
    
        test('Should return a message insertion error if updated wrong user', async () => {
            const user_id =   await postUserAndGetId();
            const response = await request(app).put(`/users/${user_id}`).send(wrongUser);
            expect(response.status).toBe(400);
            expect(response.body.message).toContain("Invalid data. All fields are required.");
        });
    
        afterAll(async () => {
            await UserModel.eliminateByName('test');
        });
    });

    describe('DELETE/ User', () => {
       
        
        test('Should return a response with status 200, type json and a user created successfully! message when a correct user is updated', async () => {

            let user_id = await  postUserAndGetId();
            const response = await request(app).delete(`/users/${user_id}`).send();
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body.message).toContain('The User has been Eliminated!');
            
           
        });
        afterAll(async () => {
            await UserModel.eliminateByName('test');
        });

        
    })

    
    afterAll(async () => {
        // server.close();
        db.close();
    });   
})  