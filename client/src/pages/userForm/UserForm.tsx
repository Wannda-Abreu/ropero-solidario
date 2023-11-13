import React, { useState } from "react";
import InputField from "../../components/atoms/inputFieldProps";
import { Container, Form, Button } from "react-bootstrap";
import ClickCounter from "../../components/Counter/counter";
import "./userForm.css";
import { Link } from "react-router-dom";

const UserForm: React.FC = () => {
  const [user_name, setUserName] = useState("");
  const [user_lastname, setUserlastname] = useState("");
  const [postalCode, setpostalCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit} className="report-container">
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
            label="Codigo Postal"
            type="text"
            value={postalCode}
            onChange={(e) => setpostalCode(e.target.value)}
          />
        </Form.Group>
        <div>Nº de familiares</div>
        <ClickCounter
          initialCount={0}
          onUpdate={function (newCount: number): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div>Personas de 0 a 18 años</div>
        <ClickCounter
          initialCount={0}
          onUpdate={function (newCount: number): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div>Personas de 0 a 18 años</div>
        <ClickCounter
          initialCount={0}
          onUpdate={function (newCount: number): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Link to="/calendar">
          <Button type="submit" className="reserve-button">
            Reservar Cita
          </Button>
        </Link>
      </Container>
    </Form>
  );
};

export default UserForm;
