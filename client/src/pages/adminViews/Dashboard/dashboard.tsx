import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import "./dashboard.css";
import { useTheme } from "@/context/ThemeContext";
import { getAdmins } from "@services/adminService";
import {
  getAppointments,
  type AppointmentRecord,
} from "@services/appointmentService";

type DashboardProps = {
  fontSize?: string;
};

type DashboardAction = {
  id: string;
  icon: IconDefinition;
  label: string;
  description: string;
  to: string;
  onSelect?: () => void;
};

const DASHBOARD_ACTIONS: DashboardAction[] = [
  {
    id: "new-user",
    icon: faUser,
    label: "Dar de alta a nuevo usuario",
    description: "Registra a beneficiarios y comparte datos con el equipo.",
    to: "/adminuserform",
    onSelect: () => console.log("Dar de alta a nuevo usuario"),
  },
  {
    id: "appointments",
    icon: faCalendar,
    label: "Ver listado de citas",
    description: "Consulta y gestiona las reservas programadas.",
    to: "/appointments",
    onSelect: () => console.log("Ver listado de citas"),
  },
  {
    id: "manage-admins",
    icon: faUserPlus,
    label: "Gestionar administradores",
    description: "Añade o elimina cuentas con acceso al panel.",
    to: "/adminsettings",
    onSelect: () => console.log("Gestionar administradores"),
  },
];

const parseAppointmentDate = (date: string, time: string) => {
  const normalisedTime = time.length === 5 ? `${time}:00` : time;
  return new Date(`${date}T${normalisedTime}`);
};

const formatAppointmentDate = (date: Date) =>
  date.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

const formatAppointmentTime = (date: Date) =>
  date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

const Dashboard = ({ fontSize }: DashboardProps) => {
  const { fontSize: contextFontSize } = useTheme();
  const resolvedFontSize = fontSize ?? contextFontSize;
  const [adminCount, setAdminCount] = useState(0);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const admins = await getAdmins();
        setAdminCount(admins.length);
      } catch (error) {
        console.error("Error al cargar administradores", error);
        setAdminCount(0);
      }
    };

    const loadAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Error al cargar citas", error);
        setAppointments([]);
        setAppointmentsError(
          "No pudimos recuperar las citas guardadas. Intenta recargar."
        );
      } finally {
        setAppointmentsLoading(false);
      }
    };

    loadAdmins();
    loadAppointments();
  }, []);

  const upcomingAppointments = useMemo(() => {
    if (appointments.length === 0) {
      return [];
    }

    const now = new Date();
    const parsed = appointments
      .map((appointment) => {
        const dateTime = parseAppointmentDate(
          appointment.appointmentDate,
          appointment.appointmentTime
        );

        return {
          ...appointment,
          dateTime,
        };
      })
      .filter(
        (appointment) => !Number.isNaN(appointment.dateTime.getTime())
      )
      .sort(
        (a, b) => a.dateTime.getTime() - b.dateTime.getTime()
      );

    const upcoming = parsed.filter(
      (appointment) => appointment.dateTime.getTime() >= now.getTime()
    );

    const base = upcoming.length > 0 ? upcoming : parsed;

    return base.slice(0, 3);
  }, [appointments]);

  const totalAppointments = appointments.length;
  const nextAppointment = upcomingAppointments[0];

  const summaryCards = useMemo(
    () => [
      {
        id: "admins",
        label: "Administradores",
        value: adminCount,
        detail:
          adminCount === 1
            ? "Usuario con acceso activo"
            : "Usuarios con acceso activo",
        to: "/adminsettings",
      },
      {
        id: "appointments-total",
        label: "Citas registradas",
        value: totalAppointments,
        detail:
          totalAppointments === 1
            ? "Reserva almacenada"
            : "Reservas almacenadas",
        to: "/appointments",
      },
      {
        id: "next-appointment",
        label: "Próxima cita",
        value: nextAppointment
          ? formatAppointmentDate(nextAppointment.dateTime)
          : "Sin citas",
        detail: nextAppointment
          ? `a las ${formatAppointmentTime(nextAppointment.dateTime)}`
          : "Agenda disponible",
      },
    ],
    [adminCount, totalAppointments, nextAppointment]
  );

  return (
    <Container
      fluid
      className="dashboard-container"
      style={{ fontSize: resolvedFontSize }}
    >
      <Row className="justify-content-center">
        <Col xl={8} lg={10} className="dashboard-content">
          <header className="dashboard-header">
            <h1 className="dashboard-title">
              Panel de administrador ropero solidario
              <span className="dashboard-title__icon" aria-hidden="true">
                <FontAwesomeIcon icon={faUserGear} />
              </span>
            </h1>
            <p className="dashboard-subtitle">
              Gestiona usuarios y citas fácilmente desde cualquier dispositivo.
            </p>
          </header>
          <section className="dashboard-grid">
            <article className="dashboard-panel dashboard-panel--stats">
              <h2 className="dashboard-panel__title">Resumen rápido</h2>
              <div className="dashboard-stats">
                {summaryCards.map((card) => (
                  <div
                    key={card.id}
                    className={`dashboard-stat-card${
                      card.to ? " dashboard-stat-card--link" : ""
                    }`}
                  >
                    <span className="dashboard-stat-card__label">
                      {card.label}
                    </span>
                    <span className="dashboard-stat-card__value">
                      {card.value}
                    </span>
                    <span className="dashboard-stat-card__detail">
                      {card.detail}
                    </span>
                    {card.to && (
                      <Link
                        className="dashboard-stat-card__cta"
                        to={card.to}
                      >
                        Ver detalle
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </article>

            <article className="dashboard-panel dashboard-panel--actions">
              <h2 className="dashboard-panel__title">Acciones rápidas</h2>
              <div
                className="dashboard-actions"
                aria-label="Acciones rápidas del panel de administración"
              >
                {DASHBOARD_ACTIONS.map((action) => (
                  <Link
                    key={action.id}
                    to={action.to}
                    className="dashboard-action-card"
                    role="button"
                    aria-label={`${action.label}. ${action.description}`}
                    onClick={() => action.onSelect?.()}
                  >
                    <span
                      className="dashboard-action-card__icon"
                      aria-hidden="true"
                    >
                      <FontAwesomeIcon icon={action.icon} />
                    </span>
                    <span className="dashboard-action-card__content">
                      <span className="dashboard-action-card__label">
                        {action.label}
                      </span>
                      <span className="dashboard-action-card__description">
                        {action.description}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </article>

            <article className="dashboard-panel dashboard-panel--appointments">
              <div className="dashboard-panel__heading">
                <h2 className="dashboard-panel__title">Próximas citas</h2>
                <span className="dashboard-panel__badge">
                  {totalAppointments} en total
                </span>
              </div>
              {appointmentsLoading ? (
                <p className="dashboard-panel__empty">Cargando citas...</p>
              ) : appointmentsError ? (
                <p className="dashboard-panel__empty dashboard-panel__empty--error">
                  {appointmentsError}
                </p>
              ) : upcomingAppointments.length === 0 ? (
                <p className="dashboard-panel__empty">
                  Aún no hay citas registradas.
                </p>
              ) : (
                <ul className="dashboard-appointment-list">
                  {upcomingAppointments.map((appointment) => (
                    <li
                      key={appointment.id}
                      className="dashboard-appointment"
                    >
                      <div className="dashboard-appointment__date">
                        <span className="dashboard-appointment__day">
                          {appointment.dateTime
                            .toLocaleDateString("es-ES", {
                              day: "2-digit",
                            })
                            .padStart(2, "0")}
                        </span>
                        <span className="dashboard-appointment__month">
                          {appointment.dateTime.toLocaleDateString("es-ES", {
                            month: "short",
                          })}
                        </span>
                      </div>
                      <div className="dashboard-appointment__info">
                        <span className="dashboard-appointment__name">
                          {appointment.name}
                        </span>
                        <span className="dashboard-appointment__meta">
                          {formatAppointmentDate(appointment.dateTime)} ·{" "}
                          {formatAppointmentTime(appointment.dateTime)}
                        </span>
                        <span className="dashboard-appointment__meta">
                          Tel. {appointment.phoneNumber}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Link className="dashboard-panel__link" to="/appointments">
                Ver listado completo
              </Link>
            </article>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;


