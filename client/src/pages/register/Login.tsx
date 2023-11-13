import React, { useState } from 'react';
import InputField from '../../components/atoms/inputFieldProps';
import { Container, Row, Form, Button, Col, Image } from 'react-bootstrap';
import logotype from "../../assets/Logos/logotype.png";
import './LoginForm.css'; 

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Container>
        <Row >
          <Col className='img-container'>
            <Image src={logotype} fluid  className='logo-img'/>
          </Col>
        </Row>
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
            value={password}
            onChange={handlePasswordChange} 
          />
        </Form.Group>
        <Button type='submit' className="login-button">
          Iniciar Sesión
        </Button>
      </Container>
    </Form>
  );
};

export default LoginForm;
