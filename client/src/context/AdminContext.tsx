import { createContext, useContext, useEffect, useState } from "react";
import AccesoDenegado from "../components/deniedAccess/AccesDenied";
import { useApi } from "./ApiContext";

const AdminContext = createContext<boolean | undefined>(undefined);

interface AdminProviderProps {
    children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {

    const { get, post } = useApi();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const cookieString = document.cookie;
        const tokenValue = cookieString.split('=')[1];

        if (tokenValue) {
            setToken(tokenValue);
        }
    }, []);

    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                if (token) {
                    const data = await post('AdminRoles/token', { token: token });
                    console.log(data);
                    setUserId(data);

                    // Lógica de checkAdminStatus directamente aquí
                    if (userId) {
                        const userData = await get(`adminUser/roles/${userId}`);
                        console.log(userData);

                        const userRole = userData[0]?.roles_name;

                        if (userRole === 'Admin') {
                            setIsAdmin(true);
                        } else {
                            setIsAdmin(false);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            verifyAdmin();
        }
    }, [post, token, userId, get]);

    if (isAdmin === false) {
        return <AccesoDenegado />;
    }

    return <AdminContext.Provider value={isAdmin}>{children}</AdminContext.Provider>;
};

export const useAdmin = (): boolean => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin debe usarse dentro de un AdminProvider');
    }
    return context;
};
