import React, { useState } from "react";
import InputField from "@/components/atoms/inputFieldProps";
import { Container, Row, Form, Col, Image } from "react-bootstrap";
import logotype from "@/assets/Logos/logotype.png";
import Button from "@/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "@services/adminService";


const RegisterForm: React.FC = () => {
  const [admin_name, setName] = useState("");
  const [admin_surname, setSurname] = useState("");
  const [email, setEmail,] = useState("");
  const [admin_password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      admin_name: admin_name.trim(),
      admin_surname: admin_surname.trim(),
      email: email.trim().toLowerCase(),
      admin_password: admin_password.trim(),
    };

    if (!payload.admin_name || !payload.admin_surname || !payload.email || !payload.admin_password) {
      setErrorMessage("Completa todos los campos obligatorios.");
      setIsSubmitting(false);
      return;
    }

    try {
      await createAdmin({
        ...payload,
      });
      navigate("/adminsettings");
    } catch (error) {
      setErrorMessage("No se pudo registrar al administrador. Inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Form onSubmit={handleSubmit} className="register-form">
      <Container>
        <Row>
          <Col className="img-container">
            <Image src={logotype} fluid className="logo-img" />
          </Col>
          </Row>
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
          <Form.Group>
          <InputField
            label="Nombre"
            type="text"
            value={admin_name}
            onChange={handleNameChange}
            required
            autoComplete="given-name"
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Apellido"
            type="text"
            value={admin_surname}
            onChange={handleSurnameChange}
            required
            autoComplete="family-name"
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            autoComplete="email"
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Password"
            type="password"
            value={admin_password}
            onChange={handlePasswordChange}
            required
            autoComplete="new-password"
            minLength={6}
          />
        </Form.Group>
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mt-5 mb-5">
          <Button
            type="button"
            text="Volver al panel"
            variant="secondary"
            onClick={handleBackToDashboard}
          />
          <Button
            type="submit"
            text={isSubmitting ? "Guardando..." : "Añadir"}
            disabled={isSubmitting}
          />
        </div>
      </Container>
    </Form>
  );
};

export default RegisterForm;
