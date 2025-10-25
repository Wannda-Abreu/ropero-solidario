import initialAdmins from "@/mocks/admins.json";

export type AdminRecord = {
  id: string;
  admin_name: string;
  admin_surname: string;
  email: string;
  admin_password: string;
};

export type AdminInput = Omit<AdminRecord, "id">;

const STORAGE_KEY = "ropero-solidario/admins";

const isBrowser = typeof window !== "undefined";

const createId = () => {
  if (isBrowser && typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `admin-${Math.random().toString(36).slice(2, 10)}`;
};

const readAdmins = (): AdminRecord[] => {
  if (!isBrowser) {
    return initialAdmins as AdminRecord[];
  }

  const storedAdmins = window.localStorage.getItem(STORAGE_KEY);

  if (storedAdmins) {
    try {
      return JSON.parse(storedAdmins) as AdminRecord[];
    } catch (error) {
      console.warn("No se pudo interpretar el contenido de localStorage:", error);
    }
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(initialAdmins, null, 2)
  );

  return initialAdmins as AdminRecord[];
};

const persistAdmins = (admins: AdminRecord[]) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(admins, null, 2));
};

export const getAdmins = async (): Promise<AdminRecord[]> => {
  return readAdmins();
};

export const createAdmin = async (payload: AdminInput): Promise<AdminRecord> => {
  const admins = readAdmins();

  const newAdmin: AdminRecord = {
    id: createId(),
    ...payload,
  };

  admins.push(newAdmin);

  persistAdmins(admins);

  return newAdmin;
};

export const deleteAdmin = async (adminId: string): Promise<boolean> => {
  const admins = readAdmins();

  const updatedAdmins = admins.filter((admin) => admin.id !== adminId);

  if (updatedAdmins.length === admins.length) {
    throw new Error("Administrador no encontrado en el almacenamiento local");
  }

  persistAdmins(updatedAdmins);

  return true;
};
