import request from 'supertest';
import app from '../../app';
import TelephoneModel from '../../src/models/telephonesModel';
import db from '../../src/config/dbConfig.sequelize';
import Telephone from '../../src/types/telephone';
import TelephoneId from '../../src/types/id-types/telephoneId';
import server from '../..';


describe('CRUD FamilyInfo Test', () => {
  let response: request.Response;

  const newtelephone: Telephone  = {
    telephone: "111111111"
  };

  const postTelephoneAndGetId = async () => {
    const createdTelephoneId: TelephoneId | null = await TelephoneModel.create(newtelephone); 
        if (!createdTelephoneId || typeof createdTelephoneId !== 'object'){return null}
        console.log(createdTelephoneId)
        const telephoneId = createdTelephoneId.telephone_id;
        console.log(telephoneId)
        return telephoneId.toString();
  };

  describe('GET /Telephone', () => {
    beforeEach(async () => {
      response = await request(app).get('/telephones').send();
    });

    test('Should return a response with status 200 and type json, when I send a Get request', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    test('Should return all Telephones', async () => {
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('GET /Telephone by ID, with the a correct UUID', () => {
    beforeEach(async () => {
      const telephoneId = await postTelephoneAndGetId();
      response = await request(app).get(`/telephones/${telephoneId}`).send();
    });

    test('Should return a response with status 200 and type json, when I send a Get by ID request', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    test('Should return a FamilyInfo', async () => {
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('GET /FamilyInfo by ID, with a wrong UUID', () => {
    
    test('Should return a response with status 200 and type json, when I send a Get by ID request', async () => {
      response = await request(app).get('/telephones/wrongUUID').send();
      expect(response.status).toBe(500);
    });

   

  }); 
  describe('POST /familyInfos', () => {
    const wrongTelephone = {
      wrong_field: 2.75,
      wrong_field2: 'pesa',
    };

    test('Should return a response with status 201 and type json when a correct Telephone is added', async () => {
      const response = await request(app).post('/telephones').send(newtelephone);
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body).toBeInstanceOf(Object)
    });

    test('Should return a message Telephone created successfully', async () => {
      const response = await request(app).post('/telephones').send(newtelephone);
      expect(response.body).toBeInstanceOf(Object);
    });

    test('Should return a message insertion error if post wrong Telephone', async () => {
      const response = await request(app).post('/telephones').send(wrongTelephone);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid Request Data. All fields are required.');
    });

    afterAll(async () => {
      await TelephoneModel.eliminateByTelephone("111111111");
    });
  });

  describe('UPDATE /familyInfos', () => {
    const updatedTelephone = {
        telephone: "111111111"
    };

    const wrongTelephone = {
      wrong_field: 2.75,
      wrong_field2: 'pesa',
    };

    test('Should return a response with status 200, type json, and a Telephone created successfully! message when a correct Telephone is updated', async () => {
      const telephoneId = await postTelephoneAndGetId();
      const response = await request(app).patch(`/telephones/${telephoneId}`).send(updatedTelephone);
      expect(response.status).toBe(200);
      
      expect(response.headers['content-type']).toContain('json');
      expect(response.body.message).toContain('The telephone has been updated successfully!');
    });

    test('Should return a message insertion error if updated wrong Telephone', async () => {
      const telephoneId = await postTelephoneAndGetId();
      const response = await request(app).patch(`/telephones/${telephoneId}`).send(wrongTelephone);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid Request Data. All fields are required.');
    });

    afterAll(async () => {
      await await TelephoneModel.eliminateByTelephone("111111111");;
    });
  });

  describe('DELETE / FamilyInfo', () => {
    test('Should return a response with status 200, type json, and a Telephone created successfully! message when a correct Telephone is updated', async () => {
      const telephoneId = await postTelephoneAndGetId();
      const response = await request(app).delete(`/telephones/${telephoneId}`).send();
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body.message).toContain('The Telephone has been Eliminated!');
    });

    test('Should return a response with status 400, type json, and a Telephone created successfully! message when a correct Telephone is updated', async () => {
      const response = await request(app).delete('/telephones/wrongId').send();
      expect(response.status).toBe(500);
     
      
    });

    afterAll(async () => {
     await TelephoneModel.eliminateByTelephone("111111111");;
    });
  });

  afterAll(async () => {
    server.close()
    db.close();
  });
  
});