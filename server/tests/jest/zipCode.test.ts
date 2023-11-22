import request from 'supertest';
import app from '../../app';
import server from '../../index';
import ZIPCodeModel from '../../src/models/zipCodeModel'; 
import db from '../../src/config/dbConfig.sequelize';

describe("CRUD ZIPCodes Test", () => {
  let response: request.Response;
  let createdZIPCodeId: string;

  const newZipCode = {
    zip_code: 12345,
  };

  const updatedZIPCode = {
    zip_code: 54321,
  };

  describe("GET /ZIPCodes", () => {
    beforeEach(async () => {
      response = await request(app).get('/ZIPCodes').send();
    });

    test('Should return a response with status 200 and type json when sending a GET request', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    test("Should return all ZIPCodes", async () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /ZIPCodes by ID", () => {
    beforeEach(async () => {
      const createdZIPCode = await ZIPCodeModel.create(newZipCode);
      createdZIPCodeId = createdZIPCode?.zip_code_id || '';
      response = await request(app).get(`/ZIPCodes/${createdZIPCodeId}`).send();
    });

    test('Should return a response with status 200 and type json when sending a GET by ID request', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    test("Should return a ZIPCode", async () => {
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('POST /ZIPCodes', () => {
    test('Should return a response with status 201 and type json when a correct ZIPCode is added', async () => {
      const response = await request(app).post('/ZIPCodes').send(newZipCode);
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toContain('json');
    });

    test('Should return a message ZIPCode created successfully', async () => {
      const response = await request(app).post('/ZIPCodes').send(newZipCode);
      expect(response.body.message).toContain("The ZIPCode has been created successfully!");
    });

    afterAll(async () => {
      await ZIPCodeModel.deleteById(createdZIPCodeId);
    });
  });

  describe('UPDATE /ZIPCodes', () => {
    test('Should return a response with status 200, type json, and a ZIPCode updated successfully! message when a correct ZIPCode is updated', async () => {
      const createdZIPCode = await ZIPCodeModel.create(newZipCode);
      const createdZIPCodeId = createdZIPCode?.zip_code_id || '';

      const response = await request(app).put(`/ZIPCodes/${createdZIPCodeId}`).send(updatedZIPCode);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body.message).toContain('The ZIPCode has been updated successfully!');
    });

    afterAll(async () => {
      await ZIPCodeModel.deleteById(createdZIPCodeId);
    });
  });

  describe('DELETE /ZIPCode', () => {
    test('Should return a response with status 200, type json, and a ZIPCode eliminated successfully! message when a correct ZIPCode is deleted', async () => {
      const createdZIPCode = await ZIPCodeModel.create(newZipCode);
      const createdZIPCodeId = createdZIPCode?.zip_code_id || '';

      const response = await request(app).delete(`/ZIPCodes/${createdZIPCodeId}`).send();
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body.message).toContain('The ZIPCode has been eliminated!');
    });

    afterAll(async () => {
      await ZIPCodeModel.deleteById(createdZIPCodeId);
    });
  });

  afterAll(async () => {
    server.close();
    db.close();
    
  });
});
