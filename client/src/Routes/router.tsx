import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import LoginForm from "../pages/register/Login";
import MyCalendar from "../pages/calendar/calendar";
import Form from "../pages/userForm/UserForm";
import NewUser from "../pages/newUser/newUser";
import AppoinmentConfirmation from "../pages/AppoinmentConfirmation/ApponinmentConfirmation"



const router =  createBrowserRouter ([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <LoginForm />
            }, 
            {
                path: "/calendar",
                element: <MyCalendar/>
            },
            {
                path: "/form",
                element: <Form/>
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