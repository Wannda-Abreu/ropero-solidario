import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Header from '../components/Navbar/Navbar'
import CarouselComponent from '../components/carousel/Carousel'
function Root()  {
    return (
        <div>
            <Header/>
            <CarouselComponent/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Root