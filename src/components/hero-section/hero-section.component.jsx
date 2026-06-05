import React from 'react';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
//since fashion model img is in the src floder we need to import it this way
//Note if it is in public image src
import fashionModel from '../../assets/images/fashion-model.png';
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
        <img className="hero__image-img" src={fashionModel} alt="Fashion Model" />
      </div>
    </section>
  );
};

export default HeroSection;
