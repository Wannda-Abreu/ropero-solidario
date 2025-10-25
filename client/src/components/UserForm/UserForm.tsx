import React, { useEffect, useMemo, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputField from "@/components/atoms/inputFieldProps";
import ClickCounter from "@/components/Counter/counter";
import Button from "@/components/Button/Button";
import "./userForm.css";

export type UserFormValues = {
  requestDate: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  householdSize: number;
  minorsCount: number;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
};

type SecondaryAction =
  | {
      label: string;
      to: string;
    }
  | {
      label: string;
      onClick: () => void;
    };

interface UserFormProps {
  onSubmit: (userData: UserFormValues) => Promise<void> | void;
  onSuccess?: () => void;
  submitLabel?: string;
  title?: string;
  description?: string;
  initialValues?: Partial<UserFormValues>;
  secondaryAction?: SecondaryAction;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

const defaultValues: UserFormValues = {
  requestDate: todayISO(),
  firstName: "",
  lastName: "",
  phoneNumber: "",
  postalCode: "",
  householdSize: 0,
  minorsCount: 0,
  appointmentDate: todayISO(),
  appointmentTime: "",
  notes: "",
};

const buildInitialValues = (initial?: Partial<UserFormValues>) => ({
  ...defaultValues,
  ...initial,
});

const createSecondaryActionButton = (
  action: SecondaryAction,
  disabled: boolean
) => {
  if ("to" in action) {
    return (
      <Link to={action.to} className="user-form__secondary-link">
        <Button
          type="button"
          text={action.label}
          variant="secondary"
          disabled={disabled}
        />
      </Link>
    );
  }

  return (
    <Button
      type="button"
      text={action.label}
      variant="secondary"
      onClick={action.onClick}
      disabled={disabled}
    />
  );
};

const UserFormComponent: React.FC<UserFormProps> = ({
  onSubmit,
  onSuccess,
  submitLabel = "Guardar",
  title = "Alta de beneficiario",
  description = "Completa los datos para registrar un nuevo usuario y asignar una cita.",
  initialValues,
  secondaryAction,
}) => {
  const initialFormValues = useMemo(
    () => buildInitialValues(initialValues),
    [initialValues]
  );

  const [formValues, setFormValues] =
    useState<UserFormValues>(initialFormValues);
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormValues, string>>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setFormValues(initialFormValues);
    setErrors({});
  }, [initialFormValues]);

  const householdCounterValue = useMemo(
    () => formValues.householdSize,
    [formValues.householdSize]
  );

  const minorsCounterValue = useMemo(
    () => formValues.minorsCount,
    [formValues.minorsCount]
  );

  const updateField = <T extends keyof UserFormValues>(
    field: T,
    value: UserFormValues[T]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validate = (values: UserFormValues) => {
    const validationErrors: Partial<Record<keyof UserFormValues, string>> = {};
    const trimmedFirstName = values.firstName.trim();
    const trimmedLastName = values.lastName.trim();
    const trimmedPhone = values.phoneNumber.trim();
    const trimmedPostalCode = values.postalCode.trim();
    const trimmedNotes = values.notes?.trim() ?? "";

    if (!trimmedFirstName) {
      validationErrors.firstName = "Introduce un nombre.";
    }

    if (!trimmedLastName) {
      validationErrors.lastName = "Introduce un apellido.";
    }

    if (!trimmedPhone) {
      validationErrors.phoneNumber = "Introduce un teléfono de contacto.";
    } else if (!/^[0-9+\s-]{6,15}$/.test(trimmedPhone)) {
      validationErrors.phoneNumber =
        "El teléfono debe tener entre 6 y 15 dígitos.";
    }

    if (trimmedPostalCode && !/^[0-9]{5}$/.test(trimmedPostalCode)) {
      validationErrors.postalCode = "El código postal debe tener 5 dígitos.";
    }

    if (!values.appointmentDate) {
      validationErrors.appointmentDate = "Selecciona una fecha para la cita.";
    }

    if (!values.appointmentTime) {
      validationErrors.appointmentTime = "Selecciona una hora para la cita.";
    }

    const appointmentDateTime = new Date(
      `${values.appointmentDate}T${values.appointmentTime || "00:00"}`
    );

    if (Number.isNaN(appointmentDateTime.getTime())) {
      validationErrors.appointmentTime =
        "La fecha y hora de la cita no son válidas.";
    }

    if (values.householdSize < 0) {
      validationErrors.householdSize = "El número de familiares no puede ser negativo.";
    }

    if (values.minorsCount < 0) {
      validationErrors.minorsCount = "El número de menores no puede ser negativo.";
    }

    if (values.minorsCount > values.householdSize) {
      validationErrors.minorsCount =
        "Los menores no pueden ser más que el total de familiares.";
    }

    if (trimmedNotes.length > 280) {
      validationErrors.notes = "Las notas pueden contener como máximo 280 caracteres.";
    }

    return {
      values: {
        ...values,
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        phoneNumber: trimmedPhone,
        postalCode: trimmedPostalCode,
        notes: trimmedNotes,
      },
      validationErrors,
    };
  };

  const resetForm = () => {
    setFormValues(initialFormValues);
    setErrors({});
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const { validationErrors, values } = validate(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
      setSubmitSuccess(true);
      resetForm();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
      setSubmitError(
        "No se pudo guardar la información. Revisa los datos e inténtalo de nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="user-form">
      <Container className="user-form__container">
        <header className="user-form__header">
          <h2>{title}</h2>
          <p>{description}</p>
        </header>

        {submitError && (
          <div className="user-form__alert user-form__alert--error" role="alert">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="user-form__alert user-form__alert--success" role="status">
            Datos guardados correctamente.
          </div>
        )}

        <section className="user-form__section">
          <h3>Datos de solicitud</h3>
          <div className="user-form__grid">
            <InputField
              label="Fecha de solicitud"
              type="date"
              value={formValues.requestDate}
              onChange={(e) => updateField("requestDate", e.target.value)}
              max={todayISO()}
              error={errors.requestDate}
              required
              autoComplete="off"
            />
            <InputField
              label="Fecha de la cita"
              type="date"
              value={formValues.appointmentDate}
              min={todayISO()}
              onChange={(e) => updateField("appointmentDate", e.target.value)}
              error={errors.appointmentDate}
              required
              autoComplete="off"
            />
            <InputField
              label="Hora de la cita"
              type="time"
              value={formValues.appointmentTime}
              onChange={(e) => updateField("appointmentTime", e.target.value)}
              error={errors.appointmentTime}
              required
            />
          </div>
        </section>

        <section className="user-form__section">
          <h3>Información de contacto</h3>
          <div className="user-form__grid">
            <InputField
              label="Nombre"
              type="text"
              value={formValues.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              placeholder="Nombre de la persona de contacto"
              error={errors.firstName}
              required
              autoComplete="given-name"
            />
            <InputField
              label="Apellido"
              type="text"
              value={formValues.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              placeholder="Apellidos"
              error={errors.lastName}
              required
              autoComplete="family-name"
            />
            <InputField
              label="Teléfono"
              type="tel"
              value={formValues.phoneNumber}
              onChange={(e) => updateField("phoneNumber", e.target.value)}
              placeholder="+34 600 000 000"
              error={errors.phoneNumber}
              required
              autoComplete="tel"
            />
            <InputField
              label="Código postal"
              type="text"
              value={formValues.postalCode}
              onChange={(e) => updateField("postalCode", e.target.value)}
              placeholder="Ej. 28010"
              error={errors.postalCode}
              inputMode="numeric"
              maxLength={5}
              autoComplete="postal-code"
            />
          </div>
        </section>

        <section className="user-form__section">
          <h3>Composición familiar</h3>
          <div className="user-form__counters">
            <div className="user-form__counter">
              <label>Nº total de familiares</label>
              <ClickCounter
                initialCount={householdCounterValue}
                onUpdate={(value) => updateField("householdSize", value)}
              />
              {errors.householdSize && (
                <span className="user-form__counter-error">
                  {errors.householdSize}
                </span>
              )}
            </div>
            <div className="user-form__counter">
              <label>Menores de 18 años</label>
              <ClickCounter
                initialCount={minorsCounterValue}
                onUpdate={(value) => updateField("minorsCount", value)}
              />
              {errors.minorsCount && (
                <span className="user-form__counter-error">
                  {errors.minorsCount}
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="user-form__section">
          <h3>Notas adicionales</h3>
          <div className="user-form__textarea">
            <label htmlFor="user-form-notes">
              Información útil para la cita (opcional)
            </label>
            <textarea
              id="user-form-notes"
              value={formValues.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              maxLength={280}
              placeholder="Añade observaciones relevantes sobre la familia o la cita."
            />
            {errors.notes && (
              <span className="user-form__counter-error">{errors.notes}</span>
            )}
          </div>
        </section>

        <div className="user-form__actions">
          {secondaryAction &&
            createSecondaryActionButton(secondaryAction, submitting)}
          <Button
            type="submit"
            text={submitting ? "Guardando..." : submitLabel}
            disabled={submitting}
          />
        </div>
      </Container>
    </Form>
  );
};

export default UserFormComponent;
