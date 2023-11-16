import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import LoginForm from "../pages/register/Login";
import MyCalendar from "../pages/Calendar/calendar";
import Form from "../pages/userForm/UserForm";
import NewUser from "../pages/newUser/newUser";
import AppoinmentConfirmation from "../pages/AppoinmentConfirmation/ApponinmentConfirmation";
import Home from "../pages/home/home";
import Dashboard from "../pages/dashboard/dashboard.tsx";



const router =  createBrowserRouter ([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <Home/>
            }, 
            {
                path: "/form",
                element: <Form />
            }, 
            {
                path: "/calendar",
                element: <MyCalendar/>
            },
            {
                path: "/login",
                element: <LoginForm/>
            },
            {
                path: "/newuser",
                element: <NewUser/>
            },
            {
                path: "/datealert",
                element: < AppoinmentConfirmation/>
            },
            {
                path: "/dashboard",
                element: <Dashboard/>
            }
        ]
            }
        ]
        )
       
export default router