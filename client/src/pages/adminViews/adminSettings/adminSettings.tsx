import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack"; 
import { useApi } from "../../../context/FrontContext";

interface AdminData {
  admin_name: string;
  admin_surname: string;
  email: string;
  admin_password: string
}

const AdminSettings = () => {
  const [adminsData, setAdminsData] = useState<AdminData[]>([]);
const {get} = useApi() 
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

  return (
    <Container fluid className="dashboard-container mt-5">
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
          <Stack gap={2}>
            {adminsData.map((admin, index) => (
              <div key={index} className="p-2">
                <strong>{`${admin.admin_name} ${admin.admin_surname}`}</strong>
                <br />
                Email: {admin.email}
              </div>
            ))}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSettings;
