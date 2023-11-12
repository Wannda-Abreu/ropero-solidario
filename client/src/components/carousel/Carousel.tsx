import Carousel from "react-bootstrap/Carousel";
import image1 from "../../assets/Images/carousel-image1.png";
import image2 from "../../assets/Images/carousel-image2.png";
import image3 from "../../assets/Images/carousel-image3.png";
import image4 from "../../assets/Images/carousel-image4.png";
import image5 from "../../assets/Images/carousel-image5.png";
import image6 from "../../assets/Images/carousel-image6.png";

const carouselImages = [image1, image2, image3, image4, image5, image6];

function CarouselComponent() {
  return (
    <Carousel interval={3000} className="carousel">
      {carouselImages.map((image, index) => (
        <Carousel.Item key={index} >
          <img
            src={image}
            className="img-fluid"
            alt="Carousel image"
            width="100%"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
