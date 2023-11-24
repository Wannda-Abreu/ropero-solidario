import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Navbar/Navbar";
import Sidebar from "../components/AdminSidebar/AdminsideBar";
import CarouselComponent from "../components/carousel/Carousel";
import { ApiProvider } from "../context/FrontContext";

function Root() {
  const location = useLocation();

  if (
    location.pathname === "/dashboard" ||
    location.pathname === "/adminuserform" ||
    location.pathname === "/appointments" ||
    location.pathname === "/adminsettings" ||
    location.pathname === "/settings" ||
    location.pathname === "/admincalendar"
    
  
  ) {
    return (
      <ApiProvider>
        <Sidebar />
        <Outlet />
      </ApiProvider>
    );
  } else if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return (
    <ApiProvider>
    <Outlet />
    </ApiProvider>)
  } else {
    return (
      <ApiProvider>
        <Header />
        <CarouselComponent />
        <Outlet />
        <Footer />
      </ApiProvider>
    );
  }
}

export default Root;
