import React, { useEffect } from "react";
import Hero from "./hero/Hero";
import ScrollButton from "../../helpers/ScrollBtn";
import ContactUsLanding from "./company-info/ContactUsLanding";
import WelcomeSection from "./welcome/WelcomeSection";
import OurServices from "./our-service/OurServices";
import SushiMenuPreview from "./menu-preview/SuShiMenuPreview";
import MenuPricingPreview from "./pricing-preview/MenuPricingPreview";
import Gallery from "./gallery/Gallery";
import StatsPreview from "./stats-preview/StatsPreview";
import MenuSlider from "./menu-slider/MenuSlider";
import BlogPreview from "./blog-preview/BlogPreview";
import Newsletter from "./newsletter/Newsletter";
import ResetLocation from "../../helpers/ResetLocation";
import ContactLanding from "./contact-info/ContactLanding";

const Homepage = () => {
  useEffect(() => {
    document.title = "Sushi Time";
    ResetLocation();
  }, []);
  return (
    <React.Fragment>
      <Hero />
      <WelcomeSection />
      <ContactUsLanding />
      <OurServices />
      <SushiMenuPreview />
      <MenuPricingPreview />
      <Gallery />
      <StatsPreview />
      <MenuSlider />
      <Newsletter />
      <BlogPreview />
      <ContactLanding />
      <ScrollButton />
    </React.Fragment>
  );
};

export default Homepage;
