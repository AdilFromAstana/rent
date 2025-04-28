import { Carousel } from "antd";

const ApartmentCarousel = ({ images, title }) => {
  return (
    <Carousel autoplay className="apartment-carousel">
      {images.map((img, index) => (
        <div key={index} className="carousel-slide">
          <img
            src="https://astps-photos-kr.kcdn.kz/webp/43/4325bb1e-b39e-4b30-8d04-45e46adbc7d2/1-400x300.webp"
            alt={`${title} ${index + 1}`}
            className="carousel-image"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ApartmentCarousel;
