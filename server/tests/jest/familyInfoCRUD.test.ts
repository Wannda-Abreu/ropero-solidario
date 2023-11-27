import request, { Response } from 'supertest';
import app from '../../app';
import server from '../../index';
import FamilyInfoModel from '../../src/models/familyInfoModel';
import FamilyInfo from '../../src/types/familyInfoTypes';
import db from '../../src/config/dbConfig.sequelize';

describe('CRUD FamilyInfo Test', () => {
  let response: Response;

  const newFamilyInfo = {
    
    number_of_family_members: 100,
    underaged_family_members: 2,
    overaged_family_members: 3,
  };

  const postFamilyInfoAndGetId = async () => {
    await request(app).post('/familyInfos').send(newFamilyInfo);
    const familyInfo = await FamilyInfoModel.findByNumberOfMembers(100);

    if (familyInfo !== null) {
      const { family_info_id, number_of_family_members, underaged_family_members, overaged_family_members } = familyInfo[0];
      return family_info_id;
    }
  };

  describe('GET /FamilyInfo', () => {
    beforeEach(async () => {
      response = await request(app).get('/familyInfos').send();
    });

    test('Should return a response with status 200 and type json, when I send a Get request', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    test('Should return all FamilyInfo', async () => {
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('GET /FamilyInfo by ID, with the a correct UUID', () => {
    beforeEach(async () => {
      const familyInfoId = await postFamilyInfoAndGetId();
      response = await request(app).get(`/familyInfos/${familyInfoId}`).send();
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
    beforeEach(async () => {
      response = await request(app).get('/familyInfos/550e8400-e29b-41d4-a716-446655440000').send();
    });

    test('Should return a response with status 200 and type json, when I send a Get by ID request', async () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toContain('Family Info not Found')
    });

   

  }); 
  describe('POST /familyInfos', () => {
    const wrongFamilyInfo = {
      wrong_field: 2.75,
      wrong_field2: 'pesa',
    };

    test('Should return a response with status 201 and type json when a correct family info is added', async () => {
      const response = await request(app).post('/familyInfos').send(newFamilyInfo);
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body).toBeInstanceOf(Object)
    });

    test('Should return a message family info created successfully', async () => {
      const response = await request(app).post('/familyInfos').send(newFamilyInfo);
      expect(response.body.message).toContain('The Family Info has been created successfully!');
    });

    test('Should return a message insertion error if post wrong family info', async () => {
      const response = await request(app).post('/familyInfos').send(wrongFamilyInfo);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid Request Data. All fields are required.');
    });

    afterAll(async () => {
      await FamilyInfoModel.eliminateByNumberOfMembers(5);
    });
  });

  describe('UPDATE /familyInfos', () => {
    const updatedFamilyInfo = {
      number_of_family_members: 100,
      underaged_family_members: 1,
      overaged_family_members: 4,
    };

    const wrongFamilyInfo = {
      wrong_field: 2.75,
      wrong_field2: 'pesa',
    };

    test('Should return a response with status 200, type json, and a family info created successfully! message when a correct family info is updated', async () => {
      const familyInfoId = await postFamilyInfoAndGetId();
      console.log(`/familyInfos/${familyInfoId}`);
      const response = await request(app).put(`/familyInfos/${familyInfoId}`).send(updatedFamilyInfo);
      expect(response.status).toBe(200);
      
      expect(response.headers['content-type']).toContain('json');
      expect(response.body.message).toContain('The Family Info has been created succesfully!');
    });

    test('Should return a message insertion error if updated wrong family info', async () => {
      const familyInfoId = await postFamilyInfoAndGetId();
      const response = await request(app).patch(`/familyInfos/${familyInfoId}`).send(wrongFamilyInfo);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid Request Data. All fields are required.');
    });

    afterAll(async () => {
      await FamilyInfoModel.eliminateByNumberOfMembers(5);
    });
  });

  describe('DELETE / FamilyInfo', () => {
    test('Should return a response with status 200, type json, and a family info created successfully! message when a correct family info is updated', async () => {
      const familyInfoId = await postFamilyInfoAndGetId();
      const response = await request(app).delete(`/familyInfos/${familyInfoId}`).send();
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body.message).toContain('The Family Info has been Eliminated!');
    });

    test('Should return a response with status 400, type json, and a family info created successfully! message when a correct family info is updated', async () => {
      const response = await request(app).delete('/familyInfos/550e8400-e29b-41d4-a716-446655440000').send();
      expect(response.status).toBe(404);
     
      
    });

   

    afterAll(async () => {
      await FamilyInfoModel.eliminateByNumberOfMembers(100);
    });
  });

  afterAll(async () => {
    // server.close();
    db.close();
  });
  
});