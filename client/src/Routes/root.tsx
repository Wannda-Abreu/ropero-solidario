import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Navbar/Navbar';
import Sidebar from '../components/AdminSidebar/AdminsideBar';
import CarouselComponent from '../components/carousel/Carousel';

function Root() {
  const location = useLocation();

  if (location.pathname === "/dashboard" ||  location.pathname === "/adminuserform") {
    return (
      <>
        <Sidebar />
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <CarouselComponent />
        <Outlet />
        <Footer />
      </>
    );
  }
}

export default Root;















