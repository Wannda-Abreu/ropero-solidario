import React, { useState } from "react";
import InputField from "../../../components/atoms/inputFieldProps";
import { Container, Form } from "react-bootstrap";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import { useApi } from "../../../context/FrontContext";

interface AdminRegisterFormProps {}

const AdminRegisterForm: React.FC<AdminRegisterFormProps> = () => {
  const [user_name, setUserName] = useState("");
  const [user_lastname, setUserLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { post } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let UserData = {
      "roles_id": "04ee54e4-8aa5-11ee-ad15-6c88141c4044",
      admin_name: user_name,
      admin_surname: user_lastname,
      email: email,
      admin_password: password,
    };

    try {
      const data = await post('adminUser/signup', UserData);
      console.log(data);

      window.location.href = "/login";
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log("Sorry, there was an error");
    }
  };

  return (
    <Form className="admin-register-form mt-4">
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
            onChange={(e) => setUserLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <InputField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="form-button">
          <Link to="/calendar">
            <Button text="Reservar cita" onClick={handleSubmit} />
          </Link>
        </div>
      </Container>
    </Form>
  );
};

export default AdminRegisterForm;