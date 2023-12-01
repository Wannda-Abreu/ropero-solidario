import React from "react";
import ClickCounter from "../../components/Counter/counter";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../atoms/inputFieldProps";
import { Form, Container } from "react-bootstrap";
import "./userForm.css";

import { useApi } from "../../context/ApiContext";



const UserFormComponent: React.FC = ( ) => {
  const [user_name, setUserName] = useState("");
  const [user_lastname, setUserlastname] = useState("");
  const [nacionality, setNacionality] = useState("");
  const [numberOfRelatives, setNumberOfRelatives] = useState(0);
  const [people0to18, setPeople0to18] = useState(0);
  const [peopleof18, setPeopleof18] = useState(0);
  const [postal_code, setPostalCode] = useState("");
  const [reference_center, setReferenceCenter] = useState("");
  const [lastDayOfReport, setLastDayOfReport] = useState("");
  const [Telephone, setTelephone] = useState("");



  const { post, put, get } = useApi();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      
      const dayOfReport = {
        day_of_last_report: lastDayOfReport,
      };

      const familyInfoData = {
        number_of_family_members: numberOfRelatives,
        underaged_family_members: people0to18,
        overaged_family_members: peopleof18,
      };

      const referenceCenterData = {
        reference_center: reference_center,
      };

      const zipCodeData = {
        zip_code: postal_code,
      };

      let TelephoneData = {
        telephone: Telephone,
      };

      let data = {
        telephone: Telephone,
      };

      let verifyUser;

      try {
        verifyUser = await post('Telephones/find', data);
        console.log('Respuesta de Telephones/find:', verifyUser);

        if (verifyUser !== null) {

          console.log(verifyUser.user_id)
          const updateUser = await get(`users/${verifyUser.user_id}`);
          console.log('Respuesta de get user:', updateUser);

          if (updateUser !== null) {

            await Promise.all([
              (async () => {
                console.log('Actualizando dayOfLastReport');
                const lastestdayOfReport = await put(`dayOfLastReport/${updateUser.date_of_last_report_id}`, dayOfReport);
                console.log('Respuesta de put dayOfLastReport:', lastestdayOfReport);
              })(),
            
              (async () => {
                console.log('Actualizando familyInfos');
                const FamilyInfo = await put(`familyInfos/${updateUser.family_info_id}`, familyInfoData);
                console.log('Respuesta de put familyInfos:', FamilyInfo);
              })(),
            
              (async () => {
                console.log('Actualizando ZIPCodes');
                const zipCodeResponse = await put(`ZIPCodes/${updateUser.zip_code_id}`, zipCodeData);
                console.log('Respuesta de put ZIPCodes:', zipCodeResponse);
              })(),
            
              (async () => {
                console.log('Actualizando referenceCenter');
                const referenceCenterResponse = await put(`referenceCenter/${updateUser.reference_center_id}`, referenceCenterData);
                console.log('Respuesta de put referenceCenter:', referenceCenterResponse);
              })(),
            
              (async () => {
                console.log('Actualizando Telephones');
                const telephone = await put(`Telephones/${verifyUser.telephone_id}`, TelephoneData);
                console.log('Respuesta de put Telephones:', telephone);
              })(),
            ]);
            

            const timeoutId = setTimeout(() => navigate(`/calendar/${verifyUser.user_id}`), 3000);

            console.log('Todas las actualizaciones PUT fueron exitosas', timeoutId);
          }
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          console.log('Número de teléfono no encontrado. Continuando con el flujo.');
        } else {
          console.error('Error en la solicitud POST a Telephones/find:', error);
          return;
        }
      }

      if (verifyUser == null) {
        const results = await Promise.all([
          post('dayOfLastReport', dayOfReport),
          post('familyInfos', familyInfoData),
          post('ZIPCodes', zipCodeData),
          post('referenceCenter', referenceCenterData),
        ]);
      
        const lastestdayOfReport = results[0];
        const familyInfoResponse = results[1];
        const zipCodeResponse = results[2];
        const referenceCenterResponse = results[3];
      

        if (lastestdayOfReport !== null && familyInfoResponse !== null && zipCodeResponse !== null && referenceCenterResponse !== null) {
          
          
          let User = {
            user_name: user_name,
            surname: user_lastname,
            nationality: nacionality,
            family_members_id: familyInfoResponse.family_info_id,
            zip_code_id: zipCodeResponse.zip_code_id,
            reference_center_id: referenceCenterResponse[0].reference_center_id,
            date_of_last_report_id: lastestdayOfReport[0].date_of_last_report_id,
          };
      
          console.log('Creando usuario', User);

          const newuser = await post('users', User);
          console.log('Respuesta de post users:', newuser);

          if (newuser !== null) {

            let TelephoneInfo = {
              user_id: newuser,
              telephone: Telephone,
            };

            console.log('Creando Telephones');
            const telephone = await post('Telephones', TelephoneInfo);
            console.log('Respuesta de post Telephones:', telephone);

          
            const timeoutId = setTimeout(() => navigate(`/calendar/${newuser}`), 3000);
            console.log(timeoutId)
          }

          console.log('Todas las peticiones POST fueron exitosas' );
        }
      }

    
    } catch (error) {
      console.error('Error en las peticiones POST/PUT:', error);
      console.log('Sorry, hubo un error');
    }
  };
  return (
    <Form  className="report-container mt-5">
      <Container>
        <Form.Group>
          <InputField
            label="Nombre"
            type="text"
            value={user_name}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Apellido"
            type="text"
            value={user_lastname}
            onChange={(e) => setUserlastname(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Nacionalidad"
            type="text"
            value={nacionality}
            onChange={(e) => setNacionality(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Código Postal"
            type="number"
            value={postal_code}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Numero de Telefono"
            type="number"
            value={Telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Centro de Referencia"
            type="text"
            value={reference_center}
            onChange={(e) => setReferenceCenter(e.target.value)}
          />
          <Form.Group>
          <InputField
            label="Fecha de su expedicion de su informe"
            type="date"
            value={lastDayOfReport}
            onChange={(e) => setLastDayOfReport(e.target.value)}
          />
        </Form.Group>
        </Form.Group>
        <div className="mt-3 mb-2">Nº de familiares según informe de derivación</div>
        <ClickCounter
          initialCount={numberOfRelatives}
          onUpdate={( newCount: number) => setNumberOfRelatives(newCount)}
        />
        <div className="mt-3 mb-2">Personas menores de 18 años</div>
        <ClickCounter
          initialCount={people0to18}
          onUpdate={(newCount: number) => setPeople0to18(newCount)}
        />
        <div className="mt-3 mb-2">Personas mayores de 18 años</div>
        <ClickCounter
          initialCount={peopleof18}
          onUpdate={(newCount: number) => setPeopleof18(newCount)}
        />
        <div className="form-button">
          <Link to='/calendar'>
            <Button text="Reservar cita" onClick={handleSubmit} />
          </Link>
        </div>
      </Container>
    </Form>
  );
};

export default UserFormComponent;