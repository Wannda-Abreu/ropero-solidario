import React, { useState } from 'react';
import InputField from '../../../components/atoms/inputFieldProps';
import { Container, Row, Form, Col, Image, Alert } from 'react-bootstrap';
import logotype from "../../../assets/Logos/logotype.png";
import Button from "../../../components/Button/Button";
import { useApi } from '../../../context/ApiContext';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [admin_password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { post } = useApi();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let AdminData = {
      email,
      admin_password
    };

    try {
      const data = await post('adminUser/login', AdminData);
        const token = data;
        document.cookie = `token= ${token}; path=/`;
        console.log(document.cookie)
      
        
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError("Usuario no encontrado");
    }
    window.location.href = '/dashboard';
  };
 
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Container>
        <Row>
          <Col className='img-container'>
            <Image src={logotype} fluid className='logo-img' />
          </Col>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
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
          <Button type="submit" text="Iniciar Sesión" />
        </div>
      </Container>
    </Form>
  );
 
};

export default LoginForm;
