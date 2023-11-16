import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faUserGear}  from "@fortawesome/free-solid-svg-icons";
import AdminSidebar from "../../components/AdminSidebar/AdminsideBar";

import "./dashboard.css";

const Dashboard = () => {
  return (
    <Container fluid className="dashboard-container">
      <Row>
        <Col className="sidebar">
          <AdminSidebar />
        </Col>
        <Col md={12} lg={9} className="dashboard-content">
          <h5 className="dashboard-title"> 
            Panel de administrador ropero solidario
            <FontAwesomeIcon icon = {faUserGear} />
          </h5>
          <div className="mt-5">
            <button
              className="panel-btn mt-3"
              onClick={() => console.log("Dar de alta a nuevo usuario")}
            >
              <FontAwesomeIcon icon={faUser} className="mt-3" />
              Dar de alta a nuevo usuario
            </button>
            <div className="mt-5">
              <button
                className="panel-btn mt-5"
                onClick={() => console.log("Ver listado de citas")}
              >
                <FontAwesomeIcon icon={faCalendar} className="mt-3" />
                Ver listado de citas
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
