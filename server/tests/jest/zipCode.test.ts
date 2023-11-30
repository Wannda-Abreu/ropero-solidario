import request from 'supertest';
import app from '../../app';
import server from '../../index';
import ZIPCodeModel from '../../src/models/zipCodeModel'; 
import db from '../../src/config/dbConfig.sequelize';
import ZiPCodeId from '../../src/types/id-types/zipCodeId';


describe("CRUD ZIPCodes Test", () => {
  
  let response: request.Response;
 

  const newZipCode = {
    zip_code: 12345
  };

  const updatedZIPCode = {
    zip_code: 22345
  };

  
  
  const createAndGetId = async (): Promise<string | null> => {
    const createdZIPCodeId: ZiPCodeId | null = await ZIPCodeModel.create(newZipCode); 
    if (!createdZIPCodeId || typeof createdZIPCodeId !== 'object'){return null}
    const zipCodeId = createdZIPCodeId.zip_code_id;
    return zipCodeId.toString();
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
      const createdZIPCodeId = await createAndGetId();
      console.log(createdZIPCodeId);
      response = await request(app).get(`/ZIPCodes/${createdZIPCodeId}`).send();
    });
      

    test('Should return a response with status 200 and type json when sending a GET by ID request', async () => {
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
    });

    test("Should return a ZIPCode", async () => {
      expect(response.body).toBeInstanceOf(Object);
    });
    afterAll(async () => {
      await ZIPCodeModel.eliminateByZipCode(12345);
      
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
      expect(response.body).toBeInstanceOf(Object);
    });
    afterAll(async () => {
      await ZIPCodeModel.eliminateByZipCode(12345);
      
    });
    
  
  });

  describe('UPDATE /ZIPCodes', () => {
     

    test('Should return a response with status 200, type json, and a ZIPCode updated successfully! message when a correct ZIPCode is updated', async () => {
    
      const createdZIPCodeId = await createAndGetId();
      console.log(createAndGetId);
      const response = await request(app).patch(`/ZIPCodes/${createdZIPCodeId}`).send(updatedZIPCode);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body.message).toContain("ZipCode was updated successfully!!!");
    });

    afterAll(async () => {
      await ZIPCodeModel.eliminateByZipCode(12345);
      await ZIPCodeModel.eliminateByZipCode(22345);
      
    });
  });


  describe('DELETE /ZIPCode', () => {
    test('Should return a response with status 200, type json, and a ZIPCode eliminated successfully! message when a correct ZIPCode is deleted', async () => {
      
      const createdZIPCodeId = await createAndGetId();
      console.log(createdZIPCodeId);
      const response = await request(app).delete(`/ZIPCodes/${createdZIPCodeId}`).send();
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('json');
      expect(response.body.message).toContain("ZipCode was deleted successfully!!!");
    });
    afterAll(async () => {
      console.log('Before calling eliminateByZipCode');
      await ZIPCodeModel.eliminateByZipCode(12345);
      
    });
  })

  afterAll(async () => {
    await ZIPCodeModel.eliminateByZipCode(12345);
    db.close();
    
  });

})
