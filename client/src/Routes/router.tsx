import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import LoginForm from "../pages/adminViews/login/Login.tsx";
import MyCalendar from "../pages/userViews/Calendar/calendar.tsx";
import UserFormPage from "../pages/userViews/userForm/userForm.tsx";
import NewUser from "../../../../ropero-solidario/client/src/pages/userViews/newUser/newUser";
import AppoinmentConfirmation from "../../../../ropero-solidario/client/src/pages/userViews/AppoinmentConfirmation/ApponinmentConfirmation.tsx";
import Home from "../../../../ropero-solidario/client/src/pages/userViews/home/home.tsx";
import Dashboard from "../../../../ropero-solidario/client/src/pages/adminViews/Dashboard/dashboard.tsx";
import AdminUserForm from "../../../../ropero-solidario/client/src/pages/adminViews/adminUserForm/adminUserForm.tsx";
import AppointmentsPage from "../../../../ropero-solidario/client/src/pages/adminViews/appointments/appointments.tsx";
import RegisterForm from "../pages/adminViews/register/register.tsx";
import AdminSettings from "../pages/adminViews/adminSettings/adminSettings.tsx";
import SettingsPage from "../pages/adminViews/settings/settings.tsx";
import AdminCalendar from "../pages/adminViews/adminCalendar/adminCalendar.tsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/userform",
        element: <UserFormPage  buttonLink="/calendar" />,
      },
      {
        path: "/calendar",
        element: <MyCalendar />,
      },
      {
        path: "/newuser",
        element: <NewUser />,
      },
      {
        path: "/datealert",
        element: <AppoinmentConfirmation />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/adminuserform",
        element: <AdminUserForm buttonLink="/admincalendar" />,
      },
      {
        path: "/admincalendar",
        element: <AdminCalendar />,
    },
      {
        path: "/appointments",
        element: <AppointmentsPage/>,
      },
      {
        path: "/adminsettings",
        element: <AdminSettings/>,
      },
    
      {
        path: "/settings",
        element: <SettingsPage/>,
      },
      
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});


export default router;
