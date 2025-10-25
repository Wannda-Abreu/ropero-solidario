import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "@/components/Button/Button";
import AlertComponent from "@/components/Alert/alert";
import InputField from "@/components/atoms/inputFieldProps";
import {
  findAppointmentByCode,
  type AppointmentRecord,
} from "@services/appointmentService";
import "./VerifyAppointmentCard.css";

const VerifyAppointmentCard = () => {
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);
  const [result, setResult] = useState<AppointmentRecord | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedCode = code.trim().toUpperCase();

    if (!trimmedCode) {
      setMessage({ type: "error", text: "Introduce un código válido." });
      setResult(null);
      return;
    }

    setVerifying(true);
    setMessage(null);

    try {
      const appointment = await findAppointmentByCode(trimmedCode);
      if (!appointment) {
        setMessage({
          type: "error",
          text: "No encontramos ninguna cita con ese código.",
        });
        setResult(null);
        return;
      }

      setMessage({ type: "success", text: "Cita localizada correctamente." });
      setResult(appointment);
    } catch (error) {
      console.error("Error al verificar el código", error);
      setMessage({
        type: "error",
        text: "No pudimos verificar el código. Inténtalo de nuevo.",
      });
      setResult(null);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Card className="verification-card">
      <Card.Body className="border-0 d-flex flex-column gap-4">
        <h2 className="verification-title">Verificar cita con código</h2>
        <p className="verification-subtitle">
          Introduce el código de seis caracteres que recibiste al confirmar tu
          cita. Podrás consultar todos los detalles registrados.
        </p>

        <form className="verification-form" onSubmit={handleSubmit}>
          <InputField
            label="Código de cita"
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value.toUpperCase())}
            maxLength={6}
            placeholder="Ej. RS8A21"
            autoComplete="off"
            required
          />
          <Button
            type="submit"
            text={verifying ? "Verificando..." : "Verificar código"}
            disabled={verifying}
          />
        </form>

        {message && (
          <AlertComponent
            variant={message.type === "success" ? "success" : "danger"}
            heading={
              message.type === "success" ? "Cita localizada" : "Verificación"
            }
            message={message.text}
            additionalMessage=""
          />
        )}

        {result && (
          <div className="verification-result">
            <dl className="verification-list">
              <div>
                <dt>Código</dt>
                <dd>{result.appointmentCode}</dd>
              </div>
              <div>
                <dt>Nombre</dt>
                <dd>{result.name}</dd>
              </div>
              <div>
                <dt>Fecha</dt>
                <dd>{result.appointmentDate}</dd>
              </div>
              <div>
                <dt>Hora</dt>
                <dd>{result.appointmentTime}</dd>
              </div>
              <div>
                <dt>Teléfono</dt>
                <dd>{result.phoneNumber}</dd>
              </div>
              <div>
                <dt>Notas</dt>
                <dd>{result.notes?.trim() || "Sin observaciones"}</dd>
              </div>
            </dl>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default VerifyAppointmentCard;
