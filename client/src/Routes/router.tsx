import { createHashRouter } from "react-router-dom";
import Root from "./root";
import LoginForm from "@/pages/adminViews/login/Login";
import MyCalendar from "@/pages/userViews/Calendar/calendar";
import UserFormPage from "@/pages/userViews/userForm/userForm";
import NewUser from "@/pages/userViews/newUser/newUser";
import AppoinmentConfirmation from "@/pages/userViews/AppoinmentConfirmation/ApponinmentConfirmation";
import VerifyAppointmentPage from "@/pages/userViews/VerifyAppointment/verifyAppointment";
import Home from "@/pages/userViews/home/home";
import Dashboard from "@/pages/adminViews/Dashboard/dashboard";
import AdminUserForm from "@/pages/adminViews/adminUserForm/adminUserForm";
import AppointmentsPage from "@/pages/adminViews/appointments/appointments";
import RegisterForm from "@/pages/adminViews/register/register";
import AdminSettings from "@/pages/adminViews/adminSettings/adminSettings";
import SettingsPage from "@/pages/adminViews/settings/settings";
import AdminCalendar from "@/pages/adminViews/adminCalendar/adminCalendar";

const router = createHashRouter([
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
        element: <UserFormPage />,
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
        path: "/verify",
        element: <VerifyAppointmentPage />,
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
        element: <AdminUserForm />,
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
]);


export default router;
