import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UserFormComponent, {
  type UserFormValues,
} from "@/components/UserForm/UserForm";
import { PENDING_APPOINTMENT_KEY } from "@/constants/storageKeys";

const UserFormPage: React.FC = () => {
  const navigate = useNavigate();

  const initialDraft = useMemo(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const stored = sessionStorage.getItem(PENDING_APPOINTMENT_KEY);

    if (!stored) {
      return undefined;
    }

    try {
      return JSON.parse(stored) as UserFormValues;
    } catch (error) {
      console.warn("No se pudo leer el borrador de la cita", error);
      return undefined;
    }
  }, []);

  const handleSubmit = async (values: UserFormValues) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        PENDING_APPOINTMENT_KEY,
        JSON.stringify(values, null, 2)
      );
    }
  };

  const handleSuccess = () => {
    navigate("/datealert");
  };

  const handleCancel = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(PENDING_APPOINTMENT_KEY);
    }
    navigate("/");
  };

  return (
    <UserFormComponent
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      submitLabel="Reservar cita"
      title="Solicitud de cita"
      description="Rellena tus datos para que podamos confirmar la cita. Podrás revisar la información en la siguiente pantalla."
      initialValues={initialDraft}
      secondaryAction={{ label: "Cancelar", onClick: handleCancel }}
    />
  );
};

export default UserFormPage;
