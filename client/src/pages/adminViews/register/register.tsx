import React, { useState } from "react";
import InputField from "../../../components/atoms/inputFieldProps";
import { Container, Row, Form, Col, Image } from "react-bootstrap";
import logotype from "../../../../src/assets/Logos/logotype.png";
import Button from "../../../components/Button/Button";
import { useApi } from "../../../context/ApiContext";

const RegisterForm: React.FC = () => {
  const [admin_name, setName] = useState("");
  const [admin_surname, setSurname] = useState("");
  const [email, setEmail,] = useState("");
  const [admin_password, setPassword] = useState("");

  const { post } = useApi();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let UserData = {
      "roles_id": "04ee54e4-8aa5-11ee-ad15-6c88141c4044",
      admin_name: admin_name,
      admin_surname: admin_surname,
      email: email,
      admin_password: admin_password,
    };

    try {
      const data = await post('adminUser/signup', UserData);
      console.log(data)

      
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log("Sorry, there was an error");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="register-form">
      <Container>
        <Row>
          <Col className="img-container">
            <Image src={logotype} fluid className="logo-img" />
          </Col>
          </Row>
          <Form.Group>
          <InputField
            label="Nombre"
            type="text"
            value={admin_name}
            onChange={handleNameChange}
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Apellido"
            type="text"
            value={admin_surname}
            onChange={handleSurnameChange}
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Password"
            type="password"
            value={admin_password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <div className="d-flex justify-content-center mt-5 mb-5">
          <Button type="submit" text="Añadir" />
        </div>
      </Container>
    </Form>
  );
};

export default RegisterForm;
