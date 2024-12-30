import React from "react";
//images
import ImgOne from "../../assets/images/about-us/img-1.jpeg";
import ImgTwo from "../../assets/images/about-us/img-2.jpeg";
import ImgThree from "../../assets/images/about-us/img-3.jpeg";

const AboutCustomers = () => {
  return (
    <article className="about__customers">
      <div className="about__customers_gallery">
        <img src={ImgOne} alt="" aria-hidden="true" />
        <img src={ImgTwo} alt="" aria-hidden="true" />
        <img src={ImgThree} alt="" aria-hidden="true" />
      </div>
      <section className="about__customers__content">
        <h2 className="sub-title">Happy Customers</h2>
        <h3>Over 1600 positive feedback</h3>
        <p>
          We believe that our success stems from our dedication to providing
          high-quality sushi and exceptional service. Our menu features a wide
          range of exquisite sushi rolls, sashimi, nigiri, and traditional
          Japanese dishes, all made with the freshest, locally sourced seafood
          and ingredients. We take great care to ensure that each dish is
          crafted with precision and attention to detail, so every bite is as
          memorable as the last. We also understand that great food is only part
          of the experience. That's why we emphasize delivering exceptional
          service to every customer who walks through our doors. Our team of
          skilled chefs and dedicated staff members is committed to providing a
          warm, welcoming atmosphere that makes every guest feel like they are
          part of our sushi family.
        </p>
      </section>
      <div className="img-glass"></div>
    </article>
  );
};

export default AboutCustomers;
