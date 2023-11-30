import { createContext, useContext } from 'react';
import { request, get, remove, put, RequestOptions, post } from '../../services/apiService';
import {getFilteredAppointments}  from "../../services/apiService";

interface ApiContextType {
  request: (url: string, options: RequestOptions) => Promise<any>;
  get: (url: string) => Promise<any>;
  remove: (url: string) => Promise<any>;
  put: (url: string, data: unknown) => Promise<any>;
  post: (url :string, data: unknown)=> Promise<any>;
  getFilteredAppointments: (url :string, data: unknown)=> Promise<any>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: React.ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const api: ApiContextType = {
    request,
    get,
    remove,
    post,
    put, 
    getFilteredAppointments
  };

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi debe usarse dentro de un ApiProvider');
  }
  return context;
};