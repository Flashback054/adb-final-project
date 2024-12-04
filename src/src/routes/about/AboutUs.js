import React from "react";
//images
import SlideOne from "../../assets/images/img-as-one.jpeg";
import SlideTwo from "../../assets/images/img-as-two.jpeg";
import SlideThree from "../../assets/images/img-as-three.webp";
import SlideFour from "../../assets/images/img-as-four.jpg";

const AboutUs = () => {
  return (
    <article className="about__company">
      <section className="about__company__content">
        <h2>About us</h2>
        <h3 className="sub-title">More than delicious food</h3>
        <p>
          Welcome to Sushi Time Restaurant! Founded in 2010, we take sushi to
          the next level with every bite, offering a unique and exceptional
          experience! With a distinctive brand and a passion for Japanese
          cuisine, we understand what our customers crave and turn those desires
          into unforgettable taste experiences. Freshness, creativity, and
          quality are just a small part of our priorities. Affordable prices, a
          convenient location in Thu Duc – Làng Đại Học - ĐHQG-HCM, and an
          easy-to-use online ordering system that lets you order with just one
          click. Simple pre-order options and fantastic packages for corporate
          events! At Sushi Time, we care about you because you are the one who
          makes us special!.
        </p>
        <div className="about__company__glass"></div>
      </section>
      <section className="about__company__gallery">
        <img src={SlideOne} alt="" aria-hidden="true" />
        <img src={SlideTwo} alt="" aria-hidden="true" />
        <img src={SlideThree} alt="" aria-hidden="true" />
        <img src={SlideFour} alt="" aria-hidden="true" />
      </section>
    </article>
  );
};

export default AboutUs;
