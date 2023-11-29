import request from 'supertest';
import app from '../../app';
import AppointmentTimeModel from '../../src/models/appointmentTimesModel';
import db from '../../src/config/dbConfig.sequelize';
import AppointmentsTime from '../../src/types/apointmentTimes';
import AppointmentsTimeId from '../../src/types/id-types/appointmentDates';


let response: request.Response;

    const newAppointmentTime: AppointmentsTime = {
        available_times: '10:30',
        is_active: true
    }

    const postAppointmentTimeAndGetId = async () => {
        const createdAppointmentTimeId: AppointmentsTimeId | null = await AppointmentTimeModel.create(newAppointmentTime); 
            if (!createdAppointmentTimeId || typeof createdAppointmentTimeId !== 'object'){return null}
            const appointmentTimeId = createdAppointmentTimeId.appointment_times_id;
            return appointmentTimeId.toString();
    }


describe("CRUD AppointmentTimes Test", () => {

    

   

    describe("GET /AppointmentsTime", () => {

        beforeEach(async () => {
            response = await request(app).get('/appointmentsTime').send();
        })
        test('Should return a response with status 200 and type json, when I send a Get request', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })
        test("Should return all Appointments", async () => {
            expect(response.body).toBeInstanceOf(Object);
        })
    })

    describe("GET /AppointmentTime by ID", () => {

        beforeEach(async () => {
            const appointmentTimeId = await postAppointmentTimeAndGetId();
            console.log(`/appointmentsTime/${appointmentTimeId}`)
            response = await request(app).get(`/appointmentsTime/${appointmentTimeId}`).send();
        });
        test('Should return a response with status 200 and type json, when I send a Get by ID request', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        test("Should return an AppointmentTime", async () => {
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('POST /appointmentsTime', () => {

        const wrongAppointmentTime = {
            wrong_field: 2.75,
            wrong_field2: "pesa"
        }

        test('Should return a response with status 201 and type json when a correct appointment is added', async () => {
            const response = await request(app).post('/appointmentsTime').send(newAppointmentTime);
            expect(response.status).toBe(201);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Should return a message appointment created successfully', async () => {
            const response = await request(app).post('/appointmentsTime').send(newAppointmentTime);
            expect(response.body.message).toContain("The Appointment has been created successfully!");
        });

        test('Should return a message insertion error if post wrong appointment', async () => {
            const response = await request(app).post('/appointmentsTime').send(wrongAppointmentTime);
            expect(response.status).toBe(400);
            expect(response.body.message).toContain("Invalid Request data. All fields are required.");
        });

        afterAll(async () => {

            await AppointmentTimeModel.eliminateByTime("10:30");
        });
    });

    describe('UPDATE /appointmentsTime', () => {

        const updatedAppointmentTime = {
            available_times: '10:30',
            is_active: true
        }

        const wrongAppointmentTime = {
            wrong_field: 2.75,
            wrong_field2: "pesa"
        }

        test('Should return a response with status 200, type json, and an appointment created successfully! message when a correct appointment is updated', async () => {
            const appointmentTimeId = await postAppointmentTimeAndGetId();
            const response = await request(app).put(`/appointmentsTime/${appointmentTimeId}`).send(updatedAppointmentTime);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body.message).toContain('The Appointment Time has been updated successfully!');
        });

        test('Should return a message insertion error if updated wrong appointment', async () => {
            const appointmentTimeId = await postAppointmentTimeAndGetId();
            const response = await request(app).put(`/appointmentsTime/${appointmentTimeId}`).send(wrongAppointmentTime);
            expect(response.status).toBe(400);
            expect(response.body.message).toContain("Invalid data. All fields are required.");
        });

        afterAll(async () => {
           
            await AppointmentTimeModel.eliminateByTime("10:30");
        });
    });

    describe('DELETE/ Appointment', () => {

        test('Should return a response with status 200, type json, and an appointment created successfully! message when a correct appointment is updated', async () => {
            const appointmentTimeId = await postAppointmentTimeAndGetId();
            const response = await request(app).delete(`/appointmentsTime/${appointmentTimeId}`).send();
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
            expect(response.body.message).toContain('The Appointment has been Eliminated!');
        });

        afterAll(async () => {
        
            await AppointmentTimeModel.eliminateByTime("10:30");
        });

    })

    afterAll(async () => {
        db.close();
    });
})

export default postAppointmentTimeAndGetId;