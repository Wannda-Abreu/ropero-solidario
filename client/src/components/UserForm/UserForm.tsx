import React, { useState } from "react";
import InputField from "../../components/atoms/inputFieldProps";
import { Container, Form } from "react-bootstrap";
import ClickCounter from "../../components/Counter/counter";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import "./userForm.css";

interface UserFormProps {
  onSubmit: (userData: UserData) => void;
  buttonLink: string;
}

interface UserData {
  user_name: string;
  user_lastname: string;
  postalCode: string;
  numberOfRelatives: number;
  people0to18: number;
}

const UserFormComponent: React.FC<UserFormProps> = ({ onSubmit, buttonLink }) => {
  const [user_name, setUserName] = useState("");
  const [user_lastname, setUserlastname] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [numberOfRelatives, setNumberOfRelatives] = useState(0);
  const [people0to18, setPeople0to18] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      user_name,
      user_lastname,
      postalCode,
      numberOfRelatives,
      people0to18,
    });
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
            label="Codigo Postal"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
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
          <Link to={buttonLink}>
            <Button text="Reservar cita" />
          </Link>
        </div>
      </Container>
    </Form>
  );
};

export default UserFormComponent;



