import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import InputField from "../atoms/inputFieldProps";
import { useApi } from "../../context/ApiContext";

interface AdminData {
  admin_name: string;
  admin_surname: string;
  email: string;
  admin_password: string;
}

const EditAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const { get, put } = useApi();
  const [adminData, setAdminData] = useState<AdminData>({
    admin_name: "",
    admin_surname: "",
    email: "",
    admin_password: "",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await get(`adminUser/${id}`);
        setAdminData(data);
      } catch (error) {
        console.error(`Error al obtener datos del administrador con ID ${id}`, error);
      }
    };

    fetchAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateAdmin = async () => {
    try {
      await put(`adminUser/${id}`, adminData);
      console.log(`Administrador con ID ${id} actualizado con éxito`);
    } catch (error) {
      console.error(`Error al actualizar el administrador con ID ${id}`, error);
    }
  };

  return (
    <Container fluid className="dashboard-container mt-5">
      <Row>
        <Col md={12} lg={9} className="dashboard-content mt-5">
          <h5 className="dashboard-title">Editar Administrador</h5>
          <Form>
            <InputField
                label="Nombre"
                type="text"
                value={adminData.admin_name}
                onChange={(e) => handleInputChange(e)}
                name="admin_name"
            />
            <InputField
                label="Apellido"
                type="text"
                value={adminData.admin_surname}
                onChange={(e) => handleInputChange(e)}
                name="admin_surname"
            />
            <InputField
                label="Email"
                type="email"
                value={adminData.email}
                onChange={(e) => handleInputChange(e)}
                name="email"
            />
            <InputField
                label="Contraseña"
                type="password"
                value={adminData.admin_password}
                onChange={(e) => handleInputChange(e)}
                name="admin_password"
            />
            <Button variant="primary" onClick={handleUpdateAdmin}>
              Actualizar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAdmin;
