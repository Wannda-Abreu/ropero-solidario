import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './assets/components/Navbar'
import Footer from './assets/components/Footer'
import Button from './assets/components/Button'
import CarouselComponent from './assets/components/Carousel'




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header />
    <CarouselComponent />
    <Button text="Reservar" />
     <Footer />

    
  </React.StrictMode>,
)
