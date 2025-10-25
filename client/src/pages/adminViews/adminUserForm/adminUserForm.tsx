import { useNavigate } from "react-router-dom";
import UserFormComponent, {
  type UserFormValues,
} from "@/components/UserForm/UserForm";
import { createAppointment } from "@services/appointmentService";

const AdminUserForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: UserFormValues) => {
    await createAppointment({
      name: `${values.firstName} ${values.lastName}`.trim(),
      appointmentDate: values.appointmentDate,
      appointmentTime: values.appointmentTime,
      phoneNumber: values.phoneNumber,
      postalCode: values.postalCode,
      householdSize: values.householdSize,
      minorsCount: values.minorsCount,
      requestDate: values.requestDate,
      notes: values.notes,
    });
  };

  return (
    <UserFormComponent
      onSubmit={handleSubmit}
      onSuccess={() => navigate("/appointments")}
      submitLabel="Guardar y ver citas"
      title="Registrar nuevo usuario y cita"
      description="Introduce los datos de la familia y asigna la cita correspondiente. Los cambios aparecerán al instante en el listado de citas."
      secondaryAction={{ label: "Volver al panel", to: "/dashboard" }}
    />
  );
};

export default AdminUserForm;
