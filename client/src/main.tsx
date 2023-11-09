import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './assets/components/Navbar/Navbar'
import Footer from './assets/components/Footer/Footer'
import Button from './assets/components/Button/Button'
import CarouselComponent from './assets/components/carousel/Carousel'
import AlertComponent from './assets/components/Alert/alert';




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header />
    <CarouselComponent />
    <AlertComponent/>
    <Button text="Reservar" />
     <Footer />

    
  </React.StrictMode>,
)
