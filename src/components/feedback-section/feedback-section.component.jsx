import React from 'react';
import './feedback-section.styles.scss';
import TestimonialCard from '../testimonial-card/testimonial-card.component';

const testimonials = [
  {
    name: 'Emily Wilson',
    quote:
      'Our customers experience has significantly improved. The feedback is positive and engagement levels have increased.',
    highlight: false,
  },
  {
    name: 'Sarah Thompson',
    quote:
      'Relying solely on the quality and style of the collection, customers are returning for more! Very happy.',
    highlight: true,
  },
  {
    name: 'Olivia Martinez',
    quote:
      'Great design, great message. It’s clean, modern, and conversion-focused. Highly satisfied.',
    highlight: false,
  },
];

const FeedbackSection = () => {
  return (
    <section className="feedback">
      <h2 className="feedback__title">Feedback Corner</h2>
      <div className="feedback__testimonials">
        {testimonials.map((item, index) => (
          <TestimonialCard
            key={index}
            name={item.name}
            quote={item.quote}
            highlight={item.highlight}
          />
        ))}
      </div>
    </section>
  );
};

export default FeedbackSection;
