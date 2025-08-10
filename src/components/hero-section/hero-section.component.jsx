import React from 'react';
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
        <button className="hero__btn">Explore Now</button>
      </div>
      <div className="hero__image">
        <img className="hero__image-img" src="" alt="Fashion Model" />
      </div>
    </section>
  );
};

export default HeroSection;
