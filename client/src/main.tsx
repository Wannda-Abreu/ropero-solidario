import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Button from './components/Button/Button'
import CarouselComponent from './components/carousel/Carousel'
import AlertComponent from './components/Alert/alert';




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header />
    <CarouselComponent />
    <AlertComponent/>
    <Button text="Reservar" />
     <Footer />

    
  </React.StrictMode>,
)
