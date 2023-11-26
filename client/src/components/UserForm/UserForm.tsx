import React, { useState } from "react";
import InputField from "../../components/atoms/inputFieldProps";
import { Container, Form } from "react-bootstrap";
import ClickCounter from "../../components/Counter/counter";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import "./userForm.css";

import { useApi } from "../../context/FrontContext";



const UserFormComponent: React.FC = ( ) => {
  const [user_name, setUserName] = useState("");
  const [user_lastname, setUserlastname] = useState("");
  const [nacionality, setNacionality] = useState("")
  const [numberOfRelatives, setNumberOfRelatives] = useState(0);
  const [people0to18, setPeople0to18] = useState(0);

  const { post } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let UserData ={
      user_name: user_name,
      surname: user_lastname,
      nacionality: nacionality,
      number_family_members: numberOfRelatives,
    };

    try {
      const data = await post('appointments', UserData);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log("Sorry, there was an error");
    }


  };

  return (
    <Form onSubmit={handleSubmit} className="report-container mt-5">
      <Container>
        <Form.Group>
          <InputField
            label="¿De que fecha es su informe de derivación?"
            type="text"
            value={user_name}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
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
            label="nacionalidad"
            type="text"
            value={nacionality}
            onChange={(e) => setNacionality(e.target.value)}
          />
        </Form.Group>
        <div className="mt-3 mb-2">Nº de familiares según informe de derivación</div>
        <ClickCounter
          initialCount={numberOfRelatives}
          onUpdate={(newCount: number) => setNumberOfRelatives(newCount)}
        />
        <div className="mt-3 mb-2">Personas menores de 18 años</div>
        <ClickCounter
          initialCount={people0to18}
          onUpdate={(newCount: number) => setPeople0to18(newCount)}
        />
        <div className="mt-3 mb-2">Personas mayores de 18 años</div>
        <ClickCounter
          initialCount={0}
          onUpdate={(newCount: number) => setPeople0to18(newCount)}
        />
        <div className="form-button">
          <Link to= '/calendar'>
            <Button text="Reservar cita" onClick={handleSubmit} />
          </Link>
        </div>
      </Container>
    </Form>
  );
};

export default UserFormComponent;



