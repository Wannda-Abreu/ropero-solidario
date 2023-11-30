import request from 'supertest';
import app from '../../app';
import server from '../../index';
import AppointmentModel from '../../src/models/appointmentsModel';
import db from '../../src/config/dbConfig.sequelize';
import AppointmentsId from '../../src/types/id-types/appointmentId';
import Appointment from '../../src/types/apointmentTypes';

describe("CRUD Appointments Test", () => {
    
    
    let response: request.Response;

    const newAppointment : Appointment = {
        appointment_day: "32",
        appointment_month: "November",
        appointment_year: "2023",
        appointment_timeC: "10:30",
        appointment_time_id: null
       
    }
    const updatedAppointment: Appointment =  {
        appointment_day: "32",
        appointment_month: "November",
        appointment_year: "2023",
        appointment_timeC: "10:30",
        appointment_time_id: null
       
    }


const postAppointmentAndGetId = async () => {
    const createdAppointmentId: AppointmentsId | null = await AppointmentModel.create(newAppointment); 
        if (!createdAppointmentId || typeof createdAppointmentId !== 'object'){return null}
        const appointmentId = createdAppointmentId.appointment_id;
        return appointmentId.toString();
}
    describe("GET /Appointments", () => {

        beforeEach(async () => {
            response = await request(app).get('/appointments').send();
        })
        test('Should return a response with status 200 and type json, when I send a Get request', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })
        test("Should return all Appointments", async () => {
            expect(response.body).toBeInstanceOf(Object);
        })
    })

    describe("GET /Appointments by ID", () => {

        beforeEach(async () => {
            const appointmentId = await postAppointmentAndGetId();
            console.log(`/appointments/${appointmentId}`)
            response = await request(app).get(`/appointments/${appointmentId}`).send();
        });
        test('Should return a response with status 200 and type json, when I send a Get by ID request', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        test("Should return an Appointment", async () => {
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('POST /appointments', () => {

        const wrongAppointment = {
            wrong_field: 2.75,
            wrong_field2: "pesa"
        }

        test('Should return a response with status 201 and type json when a correct appointment is added', async () => {
            const response = await request(app).post('/appointments').send(newAppointment);
            expect(response.status).toBe(201);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Should return a message appointment created successfully', async () => {
            const response = await request(app).post('/appointments').send(newAppointment);
            expect(response.body).toBeInstanceOf(Object);
        });

        test('Should return a message insertion error if post wrong appointment', async () => {
            const response = await request(app).post('/appointments').send(wrongAppointment);
            expect(response.status).toBe(400);
            expect(response.body.message).toContain("Invalid Request data. All fields are required.");
        });

        afterAll(async () => {

            await AppointmentModel.eliminateByDay("32");
        });
    });

    describe('UPDATE /appointments', () => {

        
        const wrongAppointment = {
            wrong_field: 2.75,
            wrong_field2: "pesa"
        }

        test('Should return a response with status 200, type json, and an appointment created successfully! message when a correct appointment is updated', async () => {
            const appointmentId = await postAppointmentAndGetId();
            const response = await request(app).put(`/appointments/${appointmentId}`).send(updatedAppointment);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body.message).toContain('The appointment has been updated successfully!');
        });

        test('Should return a message insertion error if updated wrong appointment', async () => {
            const appointmentId = await postAppointmentAndGetId();
            const response = await request(app).put(`/appointments/${appointmentId}`).send(wrongAppointment);
            expect(response.status).toBe(400);
            expect(response.body.message).toContain("Invalid data. All fields are required.");
        });

        afterAll(async () => {
           
            await AppointmentModel.eliminateByDay("32");
        });
    });

    describe('DELETE/ Appointment', () => {

        test('Should return a response with status 200, type json, and The Appointment has been Eliminated! message when a correct appointment is deleted', async () => {
            const appointmentId = await postAppointmentAndGetId();
            const response = await request(app).delete(`/appointments/${appointmentId}`).send();
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body.message).toContain('The Appointment has been Eliminated!');
        });

        afterAll(async () => {
        
            await AppointmentModel.eliminateByDay("32");
        });

    })

    afterAll(async () => {
        server.close()
        db.close();
    });
})

