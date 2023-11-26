import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Navbar/Navbar";
import Sidebar from "../components/AdminSidebar/AdminsideBar";
import CarouselComponent from "../components/carousel/Carousel";
import { ApiProvider } from "../context/FrontContext";

function Root() {
  const location = useLocation();
  const isAdminPage =
    location.pathname === "/dashboard" ||
    location.pathname === "/adminuserform" ||
    location.pathname === "/appointments" ||
    location.pathname === "/adminsettings" ||
    location.pathname === "/settings" ||
    location.pathname === "/admincalendar";

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <ApiProvider>
      {isAdminPage ? (
        <>
          <Sidebar />
          <Outlet />
        </>
      ) : isAuthPage ? (
        <Outlet />
      ) : (
        <>
          <Header />
          <CarouselComponent />
          <Outlet />
          <Footer />
        </>
      )}
    </ApiProvider>
  );
}

export default Root;
