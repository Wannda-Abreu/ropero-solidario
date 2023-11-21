import DateOfLastReportModel from "../../src/models/dateOfLastReportModel";
import db from "../../src/config/dbConfig.sequelize";
import { describe } from "vitest";
import { server, app } from "../../app";
import supertest from "supertest";

describe('DateOfLastReport CRUD Tests', () => {
    const request = supertest(app);
  
    // Puedes agregar más pruebas según tus necesidades
  
    it('should get all dateOfLastReports', async () => {
      const response = await request.get('/api/dateOfLastReports');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0); // Actualiza esto según tus expectativas
    });
  
    it('should create a new dateOfLastReport', async () => {
      const response = await request.post('/api/dateOfLastReports').send({
        day_of_last_report: '2023-11-21', // Actualiza esto según tus datos de prueba
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('date_of_last_report_id');
    });
  
    it('should update a dateOfLastReport', async () => {
      // Primero, crea un dateOfLastReport para actualizar (puedes utilizar la función de creación)
      const createdDateOfLastReport = await request.post('/api/dateOfLastReports').send({
        day_of_last_report: '2023-11-21',
      });
  
      const updatedResponse = await request.put(`/api/dateOfLastReports/${createdDateOfLastReport.body.date_of_last_report_id}`).send({
        day_of_last_report: '2023-11-22', // Actualiza esto según tus datos de prueba
      });
  
      expect(updatedResponse.status).toBe(200);
      expect(updatedResponse.body.day_of_last_report).toBe('2023-11-22'); // Actualiza esto según tus expectativas
    });
  
    it('should delete a dateOfLastReport', async () => {
      // Primero, crea un dateOfLastReport para eliminar (puedes utilizar la función de creación)
      const createdDateOfLastReport = await request.post('/api/dateOfLastReports').send({
        day_of_last_report: '2023-11-21',
      });
  
      const deleteResponse = await request.delete(`/api/dateOfLastReports/${createdDateOfLastReport.body.date_of_last_report_id}`);
  
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.date_of_last_report_id).toBe(createdDateOfLastReport.body.date_of_last_report_id);
    });
  });
  
  
/*describe ('DateOfLastReport CRUD TEST', () => {

    let response: request.Response;
    const newDateOfLastReport = {
        date_of_last_report_id: null,
        day_of_last_report: '2023-11-21',
    };

    const postDateOfLastReportAndGetId = async () => {
        await request(app).post('/date-of-last-reports').send(newDateOfLastReport);
        const dateOfLastReport = await DateOfLastReportModel.findById('test'); 

        if (dateOfLastReport != null ) {
            let { date_of_last_report_id, day_of_last_report } = dateOfLastReport[0];
            return date_of_last_report_id;
        }
    }

    describe('GET /date-of-last-reports', () => {
        beforeEach(async () => {
            response = await request(app).get('/date-of-last-reports').send();
        });

        test('Should return a response with status 200 and type json when I send a Get request', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Should return all Date Of Last Reports', async () => {
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('GET /date-of-last-reports by ID', () => {
        beforeEach(async () => {
            const date_of_last_report_id = await postDateOfLastReportAndGetId();
            response = await request(app).get(`/date-of-last-reports/${date_of_last_report_id}`).send();
        });

        test('Should return a response with status 200 and type json when I send a Get by ID request', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Should return a Date Of Last Report', async () => {
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('POST /date-of-last-reports', () => {
        test('Should return a response with status 201 and type json when a correct Date Of Last Report is added', async () => {
            const response = await request(app).post('/date-of-last-reports').send(newDateOfLastReport);
            expect(response.status).toBe(201);
            expect(response.headers['content-type']).toContain('json');
        });

        // Puedes agregar más pruebas para verificar mensajes y casos de error si es necesario.

        afterAll(async () => {
            // Puedes realizar limpieza después de las pruebas si es necesario.
        });
    });

    describe('PATCH /date-of-last-reports', () => {
        const updatedDateOfLastReport = {
            day_of_last_report: '2023-11-22',
        };

        test('Should return a response with status 200, type json, and a Date Of Last Report updated successfully! message when a correct Date Of Last Report is updated', async () => {
            const date_of_last_report_id = await postDateOfLastReportAndGetId();
            const response = await request(app).patch(`/date-of-last-reports/${date_of_last_report_id}`).send(updatedDateOfLastReport);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body.message).toContain('The date of last report has been updated successfully!');
        });

        // Puedes agregar más pruebas para verificar mensajes y casos de error si es necesario.

        afterAll(async () => {
            // Puedes realizar limpieza después de las pruebas si es necesario.
        });
    });
});*/