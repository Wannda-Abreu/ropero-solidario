import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./dashboard.css";
import FontSizeToggle from "../../../components/ThemeSettings/fontsizeSettings";

const Dashboard = () => {

  return (
    <Container fluid className="dashboard-container" style={{ fontSize: `${FontSizeToggle}px` }}>
      <Row>
        <Col md={12} lg={9} className="dashboard-content">
          <h5 className="dashboard-title">
            Panel de administrador ropero solidario
            <FontAwesomeIcon icon={faUserGear} />
          </h5>
          <div className="mt-5">
            <Link to="/adminuserform">
              <button
                className="panel-btn mt-3"
                onClick={() => console.log("Dar de alta a nuevo usuario")}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="dashboard-button mt-3"
                />
                Dar de alta a nuevo usuario
              </button>
            </Link>
            <div className="mt-5">
              <Link to="/appointments">
                <button
                  className="panel-btn mt-5"
                  onClick={() => console.log("Ver listado de citas")}
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="dashboard-button mt-3"
                  />
                  Ver listado de citas
                </button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

