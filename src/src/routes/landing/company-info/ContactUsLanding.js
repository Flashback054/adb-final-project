import React from "react";
import { motion } from "framer-motion";
import PizzaOne from "../../../assets/images/contact-us/image-one-parallax.webp";
import "./company-info.css";

const ContactUsLanding = () => {
  return (
    <section className="homepage__company-info flex-container flex-row txt-white">
      <motion.img
        initial={{ opacity: 0, right: 100 }}
        whileInView={{ opacity: 0.8, right: 300 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        src={PizzaOne}
        alt=""
        aria-hidden="true"
        className="parallax company-info__img"
        loading="lazy"
      />
      <motion.img
        initial={{ opacity: 0, right: 100 }}
        whileInView={{ opacity: 0.8, right: 200 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        src={PizzaOne}
        alt=""
        aria-hidden="true"
        className="parallax company-info__img"
        loading="lazy"
      />
      <motion.img
        initial={{ opacity: 0, right: 50 }}
        whileInView={{ opacity: 0.8, right: 100 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        src={PizzaOne}
        alt=""
        aria-hidden="true"
        className="parallax company-info__img"
        loading="lazy"
      />
      <section className="company-info__details">
        <div>
          <h2>(+84) 123 456789</h2>
          <p>Contact us if you have any questions</p>
        </div>
        <div>
          <h2>215 Đường Vành Đai </h2>
          <p>Thủ Đức, TP Hồ Chí Minh</p>
        </div>
        <div>
          <h2>Open Monday-Friday</h2>
          <p>8:00am - 9:00pm</p>
        </div>
      </section>
    </section>
  );
};

export default ContactUsLanding;
