import React from 'react';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './hero-section.styles.scss';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero__text">
        <h1 className="hero__title">discover and find your own fashion!</h1>
        <p className="hero__description">
          Explore our curated collection of stylish clothing and accessories tailored to your
          unique taste.
        </p>
        <Button>Explore Now</Button>
      </div>
      <div className="hero__image">
        <img className="hero__image-img" src="" alt="Fashion Model" />
      </div>
    </section>
  );
};

export default HeroSection;
