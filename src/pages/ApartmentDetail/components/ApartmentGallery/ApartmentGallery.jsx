import { Carousel } from "antd";

const ApartmentGallery = ({ images }) => (
  <Carousel className="carousel" autoplay>
    {images.map((img, index) => (
      <div key={index}>
        <img src={img} alt={`Фото ${index + 1}`} />
      </div>
    ))}
  </Carousel>
);

export default ApartmentGallery;
