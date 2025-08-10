import React from "react";
import "./testimonial-card.styles.scss";

const TestimonialCard = ({ name, quote, highlight }) => {
  return (
    <blockquote className={`testimonial-card ${highlight ? "testimonial-card--highlight" : ""}`}>
      <h2 className="testimonial-card__name">{name}</h2>
      <p className="testimonial-card__quote">{quote}</p>
    </blockquote>
  );
};

export default TestimonialCard;
