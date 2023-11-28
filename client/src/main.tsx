import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from './Routes/router';
;
import { ApiProvider } from './context/ApiContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApiProvider>
            <RouterProvider router={router}/>
    </ApiProvider>

);