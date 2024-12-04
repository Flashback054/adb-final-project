import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import ourServices from "../../../data/ourServices";
import "./our-service.css";

const OurServices = () => {
  return (
    <article className="homepage__services">
      <h2 className="pop-font">Our Services</h2>
      <p className="pop-font section-description">
        Sushi Time offers services in Ho Chi Minh City, with a wide variety of
        sushi and Japanese dishes for you to choose from! What makes us special
        is our team of experts with extensive knowledge and passion for the
        authentic Japanese cuisine we serve.
      </p>
      <section className="services__items flex-container flex-column">
        {ourServices.map((service) => (
          <Tilt key={service.id}>
            <section className="services__item flex-container flex-column">
              <motion.img
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                }}
                width="50"
                height="50"
                src={service.img}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />

              <section>
                <h3 className="pop-font">{service.name}</h3>
                <p>{service.description}</p>
              </section>
            </section>
          </Tilt>
        ))}
      </section>
    </article>
  );
};

export default OurServices;
