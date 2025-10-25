import React, { useState } from "react";
import InputField from "@/components/atoms/inputFieldProps";
import { Container, Row, Form, Col, Image } from "react-bootstrap";
import logotype from "@/assets/Logos/logotype.png";
import Button from "@/components/Button/Button";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { getAdmins } from "@services/adminService";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [admin_password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

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

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = admin_password.trim();

    try {
      const admins = await getAdmins();

      const matchingAdmin = admins.find(
        (admin) =>
          admin.email.trim().toLowerCase() === trimmedEmail &&
          admin.admin_password === trimmedPassword
      );

      if (!matchingAdmin) {
        setErrorMessage(
          "Credenciales inválidas. Verifica tu email y contraseña."
        );
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error en login", error);
      setErrorMessage("No se pudo validar el acceso. Inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
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
            autoComplete="current-password"
            minLength={6}
          />
        </Form.Group>
        <div className="d-flex justify-content-center mt-5 mb-5">
          <Button
            type="submit"
            text={isSubmitting ? "Validando..." : "Iniciar sesión"}
            disabled={isSubmitting}
          />
        </div>
      </Container>
    </Form>
  );
};

export default LoginForm;
