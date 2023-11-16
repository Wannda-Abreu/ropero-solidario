import { Outlet, useLocation } from "react-router-dom";
import Footer from '../components/Footer/Footer'
import Header from '../components/Navbar/Navbar'
import CarouselComponent from '../components/carousel/Carousel'

function Root() {
    const location = useLocation();
  
    if (location.pathname === "/login" || location.pathname === "/register") {
      return <Outlet />;
    } else {
      return (
        <div>
        <Header/>
        <CarouselComponent/>
        <Outlet/>
        <Footer/>
    </div>
    );
    }
}

export default Root;












/*function Root()  {
    return (
        <div>
            <Header/>
            <CarouselComponent/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Root*/