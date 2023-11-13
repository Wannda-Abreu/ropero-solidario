import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import LoginForm from "../pages/register/Login";
import MyCalendar from "../pages/calendar/calendar";
import Form from "../pages/userForm/UserForm";
import NewUser from "../pages/newUser/newUser";
import AppoinmentConfirmation from "../pages/appoinmentConfirmation/apponinmentConfirmation";
import Home from "../pages/home/home";



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
            }
        ]
            }
        ]
        )
       
export default router