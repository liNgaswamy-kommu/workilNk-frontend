import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* 🔴 CUSTOM ARROWS */
const PrevArrow = ({ onClick }) => (
  <div className="carousel-arrow prev" onClick={onClick}>
    &#8249;
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className="carousel-arrow next" onClick={onClick}>
    &#8250;
  </div>
);

const services = [
  { title: "Vegetable Delivery", img: "/services/Vegetable Delivery.png" }, // ✅ FIXED
  { title: "Water Can Delivery", img: "/services/Water can Delivery.png" },
  { title: "House Cleaners", img: "/services/House cleaners.png" },
  { title: "Document Delivery", img: "/services/Document Delivery.png" },
  { title: "Car Wash", img: "/services/Car wash.png" },
  {
    title: "Electrician & Plumber",
    img: "/services/Electrician and plumber.png",
  },
  { title: "House Renovation", img: "/services/House renovation.png" },
  { title: "House Shift", img: "/services/House shift.png" },
  { title: "Patient Caring", img: "/services/Patient caring.png" },
  {
    title: "Tuition & Technical Support",
    img: "/services/Tution and Technical support.png",
  },
  { title: "Waiting For Work", img: "/services/waitingForWork.png" },
];

const ServicesCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1700,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">
        From <span className="highlight-red">small tasks</span> to{" "}
        <span className="highlight-dark">big works</span>
      </h2>

      <Slider {...settings}>
        {services.map((s, i) => (
          <div key={i} className="carousel-card">
            <img src={s.img} alt={s.title} />
            <p className="carousel-label">{s.title}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ServicesCarousel;
