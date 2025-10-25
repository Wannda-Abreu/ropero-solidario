import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "@/components/Button/Button";
import {
  AppointmentRecord,
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "@services/appointmentService";
import "./appointments.css";

const AppointmentItem = ({
  appointment,
  onDelete,
  isDeleting,
  onEdit,
  isEditing,
  editValues,
  onFieldChange,
  onCancelEdit,
  onSaveEdit,
  editError,
  savingEdit,
}: {
  appointment: AppointmentRecord;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  onEdit: (appointment: AppointmentRecord) => void;
  isEditing: boolean;
  editValues: Partial<AppointmentRecord>;
  onFieldChange: (field: keyof AppointmentRecord, value: string) => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: string) => void;
  editError: string | null;
  savingEdit: boolean;
}) => (
  <div className="appointment-card">
    {isEditing ? (
      <div className="appointment-card__edit">
        <div className="appointment-card__edit-grid">
          <label>
            Fecha
            <input
              type="date"
              value={editValues.appointmentDate ?? ""}
              onChange={(e) =>
                onFieldChange("appointmentDate", e.target.value)
              }
            />
          </label>
          <label>
            Hora
            <input
              type="time"
              value={editValues.appointmentTime ?? ""}
              onChange={(e) =>
                onFieldChange("appointmentTime", e.target.value)
              }
            />
          </label>
          <label>
            Teléfono
            <input
              type="tel"
              value={editValues.phoneNumber ?? ""}
              onChange={(e) => onFieldChange("phoneNumber", e.target.value)}
            />
          </label>
          <label className="appointment-card__notes">
            Notas
            <textarea
              value={editValues.notes ?? ""}
              onChange={(e) => onFieldChange("notes", e.target.value)}
              maxLength={280}
            />
          </label>
        </div>
        {editError && (
          <span className="appointment-card__error">{editError}</span>
        )}
        <div className="appointment-card__actions">
          <Button
            type="button"
            text="Cancelar"
            variant="secondary"
            onClick={onCancelEdit}
            disabled={savingEdit}
          />
          <Button
            type="button"
            text={savingEdit ? "Guardando..." : "Guardar"}
            onClick={() => onSaveEdit(appointment.id)}
            disabled={savingEdit}
          />
        </div>
      </div>
    ) : (
      <>
        <div className="appointment-card__info">
          <strong>{appointment.name}</strong>
          <span>
            Fecha de Cita:{" "}
            <time dateTime={appointment.appointmentDate}>
              {appointment.appointmentDate}
            </time>
          </span>
          <span>Hora de Cita: {appointment.appointmentTime}</span>
          <span>Teléfono: {appointment.phoneNumber}</span>
          {appointment.notes && (
            <span className="appointment-card__notes-text">
              Notas: {appointment.notes}
            </span>
          )}
        </div>
        <div className="appointment-card__actions">
          <Button
            type="button"
            text="Editar"
            variant="secondary"
            onClick={() => onEdit(appointment)}
            disabled={isDeleting}
          />
          <Button
            type="button"
            text={isDeleting ? "Eliminando..." : "Eliminar"}
            variant="secondary"
            disabled={isDeleting}
            onClick={() => onDelete(appointment.id)}
          />
        </div>
      </>
    )}
  </div>
);

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<AppointmentRecord>>({});
  const [editError, setEditError] = useState<string | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const loadAppointments = async () => {
    try {
      setErrorMessage(null);
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error al obtener citas", error);
      setErrorMessage("No se pudieron cargar las citas guardadas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleDelete = async (appointmentId: string) => {
    setDeletingId(appointmentId);
    try {
      await deleteAppointment(appointmentId);
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (error) {
      console.error("Error al eliminar cita", error);
      setErrorMessage(
        "No se pudo eliminar la cita seleccionada. Inténtalo de nuevo."
    );
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (appointment: AppointmentRecord) => {
    setEditingId(appointment.id);
    setEditError(null);
    setEditValues({
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      phoneNumber: appointment.phoneNumber,
      notes: appointment.notes ?? "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValues({});
    setEditError(null);
  };

  const handleEditChange = (
    field: keyof AppointmentRecord,
    value: string
  ) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setEditError(null);
  };

  const handleSaveEdit = async (appointmentId: string) => {
    if (!editValues.appointmentDate || !editValues.appointmentTime) {
      setEditError("Selecciona una fecha y hora válida para la cita.");
      return;
    }

    setSavingEdit(true);
    setEditError(null);

    try {
      const updated = await updateAppointment(appointmentId, {
        appointmentDate: editValues.appointmentDate,
        appointmentTime: editValues.appointmentTime,
        phoneNumber: editValues.phoneNumber,
        notes: editValues.notes,
      });

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentId ? updated : appointment
        )
      );
      handleCancelEdit();
    } catch (error) {
      console.error("Error al editar cita", error);
      setEditError("No se pudo actualizar la cita. Inténtalo nuevamente.");
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="appointment-page">
      <header className="appointment-header">
        <h3>Listado de Citas</h3>
        <p>Gestiona las reservas registradas en el sistema.</p>
      </header>
      {errorMessage && (
        <div className="appointment-alert" role="alert">
          {errorMessage}
        </div>
      )}
      {loading ? (
        <p className="appointment-empty">Cargando citas...</p>
      ) : appointments.length === 0 ? (
        <p className="appointment-empty">
          Aún no hay citas registradas. Añade nuevas reservas desde el calendario
          o formulario correspondiente.
        </p>
      ) : (
        <Stack gap={3}>
          {appointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onDelete={handleDelete}
              isDeleting={deletingId === appointment.id}
              onEdit={handleEdit}
              isEditing={editingId === appointment.id}
              editValues={editingId === appointment.id ? editValues : {}}
              onFieldChange={handleEditChange}
              onCancelEdit={handleCancelEdit}
              onSaveEdit={handleSaveEdit}
              editError={editingId === appointment.id ? editError : null}
              savingEdit={savingEdit && editingId === appointment.id}
            />
          ))}
        </Stack>
      )}
    </div>
  );
};

export default AppointmentsPage;


