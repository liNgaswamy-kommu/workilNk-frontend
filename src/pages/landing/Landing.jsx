import SearchSection from "./SearchSection";
import ServicesCarousel from "./ServicesCarousel";
import HowWorkiLnkWorks from "./HowWorkiLnkWorks";
import WhyChooseWorkiLnk from "./WhyChooseWorkiLnk";
import Footer from "../../components/Footer/Footer";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <SearchSection />
      <ServicesCarousel />
      <HowWorkiLnkWorks />
      <WhyChooseWorkiLnk />
      <Footer />
    </div>
  );
};

export default Landing;
