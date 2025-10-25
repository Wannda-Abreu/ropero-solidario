import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  getAdmins,
  deleteAdmin as deleteAdminService,
} from "@services/adminService";
import "./adminSettings.css";

interface AdminData {
  id?: string;
  admin_name: string;
  admin_surname: string;
  email: string;
}

const AdminSettings = () => {
  const [adminsData, setAdminsData] = useState<AdminData[]>([]);
  const [deletingAdminId, setDeletingAdminId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const data = await getAdmins();
        setAdminsData(data);
      } catch (error) {
        console.error('Error al obtener datos de administradores', error);
      }
    };

    fetchDataFromDatabase();
  }, []);

  const resolveAdminIdentifier = (admin: AdminData) => admin.id ?? admin.email;

  const handleDeleteAdmin = async (admin: AdminData) => {
    const identifier = resolveAdminIdentifier(admin);

    if (!identifier) {
      console.error("No se puede eliminar al administrador: identificador ausente.");
      return;
    }

    const confirmation = window.confirm(
      `¿Deseas eliminar a ${admin.admin_name} ${admin.admin_surname}?`
    );

    if (!confirmation) {
      return;
    }

    try {
      setDeletingAdminId(identifier);
      setErrorMessage(null);
      await deleteAdminService(identifier);
      setAdminsData((prevAdmins) =>
        prevAdmins.filter(
          (currentAdmin) => resolveAdminIdentifier(currentAdmin) !== identifier
        )
      );
    } catch (error) {
      setErrorMessage("No se pudo eliminar al administrador. Inténtalo de nuevo.");
    } finally {
      setDeletingAdminId(null);
    }
  };

  return (
    <Container fluid className="dashboard-container mt-5">
      <Row>
        <Col md={12} lg={9} className="dashboard-content mt-5">
          <h5 className="dashboard-title">
            Ajustes administradores
            <FontAwesomeIcon icon={faUserGear} />
          </h5>
          <div className="admin-settings-actions mt-4">
            <Link to="/register">
              <button
                className="panel-btn"
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

          {errorMessage && (
            <div className="admin-settings__alert" role="alert">
              {errorMessage}
            </div>
          )}

          <section className="admin-list" aria-live="polite">
            {adminsData.length === 0 ? (
              <p className="admin-list__empty">
                Todavía no hay administradores registrados.
              </p>
            ) : (
              adminsData.map((admin, index) => {
                const adminIdentifier = resolveAdminIdentifier(admin);
                const key = adminIdentifier ?? `admin-${index}`;
                const isDeleting = deletingAdminId === adminIdentifier;
                const isRemovable = Boolean(adminIdentifier);

                return (
                  <article key={key} className="admin-card">
                    <div className="admin-card__info">
                      <h6 className="admin-card__name">
                        {admin.admin_name} {admin.admin_surname}
                      </h6>
                      <span className="admin-card__email">{admin.email}</span>
                    </div>
                    <button
                      type="button"
                      className="admin-card__delete"
                      onClick={() => handleDeleteAdmin(admin)}
                      disabled={isDeleting || !isRemovable}
                    >
                      {!isRemovable
                        ? "No disponible"
                        : isDeleting
                        ? "Eliminando..."
                        : "Eliminar"}
                    </button>
                  </article>
                );
              })
            )}
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSettings;
