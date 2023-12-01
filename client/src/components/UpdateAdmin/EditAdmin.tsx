import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "../Button/Button";
import InputField from "../atoms/inputFieldProps";
import { useApi } from "../../context/ApiContext";

interface AdminData {
  admin_name: string;
  admin_surname: string;
  email: string;
  admin_password: string;
  role: string;
}

interface Role {
  roles_id: string;
  roles_name: string;
}

const EditAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const { get, put } = useApi();
  const [adminData, setAdminData] = useState<AdminData>({
    admin_name: "",
    admin_surname: "",
    email: "",
    admin_password: "",
    role: "",
  });

  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const admin = await get(`adminUser/${id}`);
        setAdminData(admin);

        const rolesData = await get("roles");
        setRoles(rolesData);
      } catch (error) {
        console.error(`Error al obtener datos del administrador con ID ${id}`, error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      window.location.href = "/adminsettings";
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
              value={adminData.admin_name || ""} 
              onChange={(e) => handleInputChange(e)}
              name="admin_name"
            />
            <InputField
              label="Apellido"
              type="text"
              value={adminData.admin_surname || ""} 
              onChange={(e) => handleInputChange(e)}
              name="admin_surname"
            />
            <InputField
              label="Email"
              type="email"
              value={adminData.email || ""} 
              onChange={(e) => handleInputChange(e)}
              name="email"
            />
            <Form.Group controlId="roleSelect">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={adminData.role || ""} 
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  Seleccione un rol
                </option>
                {roles.map((role) => (
                  <option key={role.roles_id} value={role.roles_id}>
                    {role.roles_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button text="Actualizar" type="button" onClick={handleUpdateAdmin} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAdmin;
