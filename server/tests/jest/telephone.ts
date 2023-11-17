// import request from 'supertest';
// import { server, app } from '../../app';
// import TelephoneModel from '../../src/models/telephoneModel';
// import db from '../../src/config/dbConfig.sequelize';

// describe('CRUD Telephones Test', () => {
//   let response: request.Response;

//   const newTelephone = {
//     telephone: '123456789',
//     user_id: null,
//   };

//   const postTelephoneAndGetId = async () => {
//     await request(app).post('/telephones').send(newTelephone);
//     const telephoneNumber = await TelephoneModel.findByNumber('123456789');

//     if (telephoneNumber !== null) {
//       const { telephone_id, telephone, user_id } = telephoneNumber[0];
//       return telephone_id;
//     }
//   };

//   describe('GET /Telephones', () => {
//     beforeEach(async () => {
//       response = await request(app).get('/telephones').send();
//     });

//     test('Should return a response with status 200 and type json when sending a Get request', async () => {
//       expect(response.status).toBe(200);
//       expect(response.headers['content-type']).toContain('json');
//     });

//     test('Should return all Telephones', async () => {
//       expect(response.body).toBeInstanceOf(Object);
//     });
//   });

//   describe('GET /Telephones by ID', () => {
//     beforeEach(async () => {
//       const telephoneId = await postTelephoneAndGetId();
//       response = await request(app).get(`/telephones/${telephoneId}`).send();
//     });

//     test('Should return a response with status 200 and type json when sending a Get by ID request', async () => {
//       expect(response.status).toBe(200);
//       expect(response.headers['content-type']).toContain('json');
//     });

//     test('Should return a Telephone', async () => {
//       expect(response.body).toBeInstanceOf(Object);
//     });
//   });

//   describe('POST /telephones', () => {
//     const newTelephone = {
//       telephone: '123456789',
//       user_id: null,
//     };

//     const wrongTelephone = {
//       wrong_field: 2.75,
//       wrong_field2: 'pesa',
//     };

//     test('Should return a response with status 200 and type json when a correct telephone is added', async () => {
//       const response = await request(app).post('/telephones').send(newTelephone);
//       expect(response.status).toBe(201);
//       expect(response.headers['content-type']).toContain('json');
//     });

//     test('Should return a message telephone created successfully', async () => {
//       const response = await request(app).post('/telephones').send(newTelephone);
//       expect(response.body.message).toContain('The Telephone has been created successfully!');
//     });

//     test('Should return a message insertion error if post wrong telephone', async () => {
//       const response = await request(app).post('/telephones').send(wrongTelephone);
//       expect(response.status).toBe(400);
//       expect(response.body.message).toContain('Invalid data. All fields are required.');
//     });

//     afterAll(async () => {
//       await TelephoneModel.eliminateByNumber('123456789');
//     });
//   });
//   describe('UPDATE /telephones', () => {
//     const updatedTelephone = {
//       telephone: '987654321',
//       user_id: null,
//     };
  
//     const wrongTelephone = {
//       wrong_field: '987654321',
//       wrong_field2: null,
//     };
  
//     test('Should return a response with status 200, type json, and a telephone updated successfully! message when a correct telephone is updated', async () => {
//       const telephone_id = await postTelephoneAndGetId();
//       const response = await request(app).patch(`/telephones/${telephone_id}`).send(updatedTelephone);
//       expect(response.status).toBe(200);
//       expect(response.headers['content-type']).toContain('json');
//       expect(response.body.message).toContain('The telephone has been updated successfully!');
//     });
  
//     test('Should return a message insertion error if updated wrong telephone', async () => {
//       const telephone_id = await postTelephoneAndGetId();
//       const response = await request(app).put(`/telephones/${telephone_id}`).send(wrongTelephone);
//       expect(response.status).toBe(400);
//       expect(response.body.message).toContain('Required telephone data');
//     });
  
//     afterAll(async () => {
//       await TelephoneModel.eliminateByNumber('987654321');
//     });
//   });
  
//   describe('DELETE /telephones', () => {
//     const newTelephone = {
//       telephone: '987654321',
//       user_id: null,
//     };
  
//     test('Should return a response with status 200, type json, and a telephone deleted successfully! message when a correct telephone is deleted', async () => {
//       await request(app).post('/telephones').send(newTelephone);
//       const telephoneObject = await TelephoneModel.findByNumber('987654321');
  
//       if (telephoneObject !== null) {
//         const { telephone_id, telephone, user_id } = telephoneObject[0];
//         const response = await request(app).delete(`/telephones/${telephone_id}`).send();
//         expect(response.status).toBe(200);
//         expect(response.headers['content-type']).toContain('json');
//         expect(response.body.message).toContain('The telephone has been deleted!');
//       }
//     });
  
//     afterAll(async () => {
//       await TelephoneModel.eliminateByNumber('987654321');
//     });
//   });
  
 

//   afterAll(async () => {
//     server.close();
//     db.close();
//   });
// });
