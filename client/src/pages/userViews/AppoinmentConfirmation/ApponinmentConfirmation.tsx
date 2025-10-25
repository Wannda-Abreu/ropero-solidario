import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "@/components/Button/Button";
import AlertComponent from "@/components/Alert/alert";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "@services/appointmentService";
import { PENDING_APPOINTMENT_KEY } from "@/constants/storageKeys";
import type {
  AppointmentInput,
  AppointmentRecord,
} from "@services/appointmentService";
import type { UserFormValues } from "@/components/UserForm/UserForm";
import "./ApponinmentConfirmation.css";

type FeedbackState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

const AppoinmentConfirmation = () => {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<UserFormValues | null>(null);
  const [createdAppointment, setCreatedAppointment] =
    useState<AppointmentRecord | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = sessionStorage.getItem(PENDING_APPOINTMENT_KEY);

    if (!stored) {
      setDraft(null);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as UserFormValues;
      setDraft(parsed);
    } catch (error) {
      console.warn("Unable to read pending appointment", error);
      setDraft(null);
    }
  }, []);

  const hasSummary = Boolean(createdAppointment || draft);
  const isDraft = Boolean(draft) && !createdAppointment;

  const clearDraft = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(PENDING_APPOINTMENT_KEY);
    }
    setDraft(null);
  };

  const handleConfirm = async () => {
    if (!draft) {
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const payload: AppointmentInput = {
        name: `${draft.firstName} ${draft.lastName}`.trim(),
        appointmentDate: draft.appointmentDate,
        appointmentTime: draft.appointmentTime,
        phoneNumber: draft.phoneNumber,
        postalCode: draft.postalCode,
        householdSize: draft.householdSize,
        minorsCount: draft.minorsCount,
        requestDate: draft.requestDate,
        notes: draft.notes,
      };

      const created = await createAppointment(payload);

      clearDraft();
      setCreatedAppointment(created);
      setFeedback({
        type: "success",
        message: `Cita registrada. Codigo: ${created.appointmentCode}. Guarda este codigo para futuras consultas.`,
      });
    } catch (error) {
      console.error("Error while confirming appointment", error);
      setFeedback({
        type: "error",
        message: "No pudimos guardar la cita. Intentalo de nuevo.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => navigate("/userform");
  const handleCancel = () => {
    clearDraft();
    setCreatedAppointment(null);
    navigate("/");
  };
  const handleFinish = () => navigate("/");

  if (!hasSummary) {
    return (
      <div className="confirmation-page">
        <Card className="confirmation-card">
          <Card.Body className="border-0 d-flex flex-column align-items-center text-center gap-4">
            <AlertComponent
              variant="warning"
              heading="No hay datos pendientes"
              message="Primero completa el formulario para generar una cita."
              additionalMessage=""
            />
            <Button
              text="Ir al formulario"
              onClick={() => navigate("/userform")}
            />
          </Card.Body>
        </Card>
      </div>
    );
  }

  const appointmentCodeDisplay = createdAppointment
    ? createdAppointment.appointmentCode
    : "Se generara al confirmar";

  const nameDisplay = createdAppointment
    ? createdAppointment.name
    : draft
    ? `${draft.firstName} ${draft.lastName}`.trim()
    : "";

  const phoneDisplay = createdAppointment?.phoneNumber ?? draft?.phoneNumber ?? "";
  const postalDisplay = createdAppointment?.postalCode ?? draft?.postalCode ?? "";
  const householdDisplay =
    createdAppointment?.householdSize ?? draft?.householdSize ?? 0;
  const minorsDisplay = createdAppointment?.minorsCount ?? draft?.minorsCount ?? 0;
  const dateDisplay = createdAppointment?.appointmentDate ?? draft?.appointmentDate ?? "";
  const timeDisplay = createdAppointment?.appointmentTime ?? draft?.appointmentTime ?? "";
  const notesDisplay = createdAppointment?.notes ?? draft?.notes ?? "";

  return (
    <div className="confirmation-page">
      <Card className="confirmation-card">
        <Card.Body className="border-0 d-flex flex-column align-items-center gap-4">
          <AlertComponent
            variant={isDraft ? "info" : "success"}
            heading={isDraft ? "Confirma tu cita" : "Cita registrada"}
            message={
              isDraft
                ? "Revisa los datos antes de confirmar. Puedes volver atras para editar cualquier informacion."
                : "Guarda tu codigo de cita para futuras consultas."
            }
            additionalMessage=""
          />

          <div className="confirmation-summary w-100">
            <dl className="confirmation-list">
              <div className="confirmation-item">
                <dt>Codigo</dt>
                <dd className="confirmation-code">{appointmentCodeDisplay}</dd>
              </div>
              <div className="confirmation-item">
                <dt>Nombre</dt>
                <dd>{nameDisplay}</dd>
              </div>
              <div className="confirmation-item">
                <dt>Telefono</dt>
                <dd>{phoneDisplay}</dd>
              </div>
              <div className="confirmation-item">
                <dt>Codigo postal</dt>
                <dd>{postalDisplay || "No especificado"}</dd>
              </div>
              <div className="confirmation-item">
                <dt>Familiares</dt>
                <dd>
                  {householdDisplay} total · {minorsDisplay} menores
                </dd>
              </div>
              <div className="confirmation-item">
                <dt>Fecha</dt>
                <dd>{dateDisplay}</dd>
              </div>
              <div className="confirmation-item">
                <dt>Hora</dt>
                <dd>{timeDisplay}</dd>
              </div>
              <div className="confirmation-item">
                <dt>Notas</dt>
                <dd>{notesDisplay.trim() || "Sin observaciones"}</dd>
              </div>
            </dl>
          </div>

          {feedback && (
            <AlertComponent
              variant={feedback.type === "success" ? "success" : "danger"}
              heading={
                feedback.type === "success"
                  ? "Cita registrada"
                  : "No se pudo registrar"
              }
              message={feedback.message}
              additionalMessage=""
            />
          )}

          <div className="confirmation-actions">
            {isDraft ? (
              <>
                <Button
                  type="button"
                  text="Editar datos"
                  variant="secondary"
                  onClick={handleEdit}
                  disabled={saving}
                />
                <Button
                  type="button"
                  text={saving ? "Guardando..." : "Confirmar cita"}
                  onClick={handleConfirm}
                  disabled={saving}
                />
                <Button
                  type="button"
                  text="Cancelar"
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={saving}
                />
              </>
            ) : (
              <Button
                type="button"
                text="Finalizar"
                onClick={handleFinish}
              />
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AppoinmentConfirmation;
