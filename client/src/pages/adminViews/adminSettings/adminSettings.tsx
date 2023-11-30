import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../../context/ApiContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface AdminData {
  admin_user_id: string
  admin_name: string;
  admin_surname: string;
  email: string;
  admin_password: string
}
const AdminSettings = () => {
  const [adminsData, setAdminsData] = useState<AdminData[]>([]);
  const { get } = useApi();

  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const data = await get("adminUser");
        setAdminsData(data);
      } catch (error) {
        console.error('Error al obtener datos de administradores', error);
      }
    };

    fetchDataFromDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditAdmin = (adminId: string) => {
    console.log(`Editar administrador con ID ${adminId}`);
  };

  const handleDeleteAdmin = (adminId: string) => {
    console.log(`Eliminar administrador con ID ${adminId}`);
  };

  return (
    <Container fluid className="dashboard-container p-5 mt-5">
      <Row>
        <Col md={12} lg={9} className="dashboard-content mt-5">
          <h5 className="dashboard-title">
            Ajustes administradores
            <FontAwesomeIcon icon={faUserGear} />
          </h5>
          <div className="mt-5">
            <Link to="/register">
              <button
                className="panel-btn mt-3"
                onClick={() => console.log("Dar de alta a nuevo administrador")}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="dashboard-button"
                />
                Añadir nuevo administrador
              </button>
            </Link>
          </div>
          <div className="d-flex flex-wrap align-items-center m-2 mt-5 p-0">
            {adminsData.map((admin, index) => (
              <div key={index} className="p-0  mt-3">
                <strong className="m-3">
                  <FontAwesomeIcon icon={faUser} /> {`${admin.admin_name} ${admin.admin_surname}`}
                </strong>
                <FontAwesomeIcon icon={faEnvelope} /> Email: {admin.email}
                <div className="d-flex ">
                  <button
                    className="appointment-button d-flex m-3"
                    onClick={() => handleEditAdmin(admin.admin_user_id)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className="appointment-button d-flex m-3"
                    onClick={() => handleDeleteAdmin(admin.admin_user_id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSettings;