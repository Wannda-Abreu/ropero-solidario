import initialAppointments from "@/mocks/appointments.json";

export type AppointmentRecord = {
  id: string;
  appointmentCode: string;
  name: string;
  appointmentDate: string;
  appointmentTime: string;
  phoneNumber: string;
  postalCode?: string;
  householdSize?: number;
  minorsCount?: number;
  requestDate?: string;
  notes?: string;
  createdAt: string;
};

export type AppointmentInput = {
  name: string;
  appointmentDate: string;
  appointmentTime: string;
  phoneNumber: string;
  postalCode?: string;
  householdSize?: number;
  minorsCount?: number;
  requestDate?: string;
  notes?: string;
  appointmentCode?: string;
};

const STORAGE_KEY = "ropero-solidario/appointments";
const isBrowser = typeof window !== "undefined";

const createId = () => {
  if (isBrowser && typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `appointment-${Math.random().toString(36).slice(2, 10)}`;
};

const createAppointmentCode = (existingCodes: Set<string>) => {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  do {
    code = "";
    for (let i = 0; i < 6; i += 1) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
  } while (existingCodes.has(code));

  existingCodes.add(code);
  return code;
};

const normaliseAppointments = (
  appointments: AppointmentRecord[]
): AppointmentRecord[] => {
  const codes = new Set<string>();

  return appointments.map((appointment) => {
    const normalisedCode = appointment.appointmentCode
      ? appointment.appointmentCode.trim().toUpperCase()
      : "";

    let finalCode = normalisedCode;

    if (!finalCode || codes.has(finalCode)) {
      finalCode = createAppointmentCode(codes);
    } else {
      codes.add(finalCode);
    }

    return {
      ...appointment,
      appointmentCode: finalCode,
      createdAt: appointment.createdAt ?? new Date().toISOString(),
    };
  });
};

const readAppointments = (): AppointmentRecord[] => {
  if (!isBrowser) {
    return normaliseAppointments(initialAppointments as AppointmentRecord[]);
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (storedValue) {
    try {
      const parsed = JSON.parse(storedValue) as AppointmentRecord[];
      return normaliseAppointments(parsed);
    } catch (error) {
      console.warn("No se pudo interpretar el contenido de citas en storage:", error);
    }
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(initialAppointments, null, 2)
  );

  return normaliseAppointments(initialAppointments as AppointmentRecord[]);
};

const persistAppointments = (appointments: AppointmentRecord[]) => {
  if (!isBrowser) return;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(appointments, null, 2)
  );
};

export const getAppointments = async (): Promise<AppointmentRecord[]> => {
  return readAppointments();
};

export const createAppointment = async (
  payload: AppointmentInput
): Promise<AppointmentRecord> => {
  const appointments = readAppointments();
  const codes = new Set(
    appointments.map((appointment) => appointment.appointmentCode)
  );

  let appointmentCode =
    payload.appointmentCode?.trim().toUpperCase() ?? "";

  if (!appointmentCode || codes.has(appointmentCode)) {
    appointmentCode = createAppointmentCode(codes);
  } else {
    codes.add(appointmentCode);
  }

  const newAppointment: AppointmentRecord = {
    id: createId(),
    appointmentCode,
    ...payload,
    createdAt: new Date().toISOString(),
  };

  appointments.push(newAppointment);
  persistAppointments(appointments);

  return newAppointment;
};

export const deleteAppointment = async (
  appointmentId: string
): Promise<boolean> => {
  const appointments = readAppointments();
  const updated = appointments.filter((item) => item.id !== appointmentId);

  if (updated.length === appointments.length) {
    throw new Error("Cita no encontrada en el almacenamiento local");
  }

  persistAppointments(updated);
  return true;
};

export const updateAppointment = async (
  appointmentId: string,
  updates: Partial<Omit<AppointmentRecord, "id" | "createdAt">>
): Promise<AppointmentRecord> => {
  const appointments = readAppointments();
  const index = appointments.findIndex((item) => item.id === appointmentId);

  if (index === -1) {
    throw new Error("Cita no encontrada en el almacenamiento local");
  }

  const updatedAppointment: AppointmentRecord = {
    ...appointments[index],
    ...updates,
    id: appointments[index].id,
    createdAt: appointments[index].createdAt,
    appointmentCode: appointments[index].appointmentCode,
  };

  appointments[index] = updatedAppointment;
  persistAppointments(appointments);

  return updatedAppointment;
};

export const findAppointmentByCode = async (
  code: string
): Promise<AppointmentRecord | null> => {
  const trimmedCode = code.trim().toUpperCase();

  if (!trimmedCode) {
    return null;
  }

  const appointments = readAppointments();
  return (
    appointments.find(
      (appointment) => appointment.appointmentCode === trimmedCode
    ) ?? null
  );
};
