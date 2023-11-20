import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import LoginForm from "../../../client/src/pages/adminViews/register/Login.tsx";
import MyCalendar from "../../../../ropero-solidario/client/src/pages/Calendar/calendar.tsx";
import UserFormPage from "../pages/userViews/userForm/userForm.tsx";
import NewUser from "../../../../ropero-solidario/client/src/pages/userViews/newUser/newUser";
import AppoinmentConfirmation from "../../../../ropero-solidario/client/src/pages/userViews/AppoinmentConfirmation/ApponinmentConfirmation.tsx";
import Home from "../../../../ropero-solidario/client/src/pages/userViews/home/home.tsx";
import Dashboard from "../../../../ropero-solidario/client/src/pages/adminViews/Dashboard/dashboard.tsx";
import AdminUserForm from "../../../../ropero-solidario/client/src/pages/adminViews/adminUserForm/adminUserForm.tsx";

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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/adminuserform",
        element: <AdminUserForm buttonLink="/admincalendar" />,
      },
    ],
  },
]);

export default router;
