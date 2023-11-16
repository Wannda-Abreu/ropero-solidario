import React, { useState } from "react";
import InputField from "../../components/atoms/inputFieldProps";
import { Container, Form } from "react-bootstrap";
import ClickCounter from "../../components/Counter/counter";
import Button from "../../components/Button/Button";
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
    <Form onSubmit={handleSubmit} className="report-container mt-5">
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
        <div className="mt-3">Nº de familiares</div>
        <ClickCounter
          initialCount={0}
          onUpdate={function (newCount: number): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className="mt-3">Personas de 0 a 18 años</div>
        <ClickCounter
          initialCount={0}
          onUpdate={function (newCount: number): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className="mt-3">Personas de 0 a 18 años</div>
        <ClickCounter
          initialCount={0}
          onUpdate={function (newCount: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      <div className="form-button mt-5">
        <Link to="/datealert">
          <Button text="Reservar cita" />
        </Link>
      </div>
      </Container>
    </Form>
  );
};

export default UserForm;
