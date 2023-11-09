import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import LoginForm from "../pages/register/Login";
import MyCalendar from "../pages/Calendar/calendar";
import Informe from "../pages/Informe/informe";



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
                path: "/informe",
                element: <Informe/>
            }
        ]
            }
        ]
        )

export default router