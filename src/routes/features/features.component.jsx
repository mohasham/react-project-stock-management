import './features.styles.scss';

const Features = () => {
  const features = [
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly and safely to your doorstep.',
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      description: 'Your payment information is always safe and encrypted.',
    },
    {
      icon: '↩️',
      title: 'Easy Returns',
      description: 'Not satisfied? Return your items hassle-free within 30 days.',
    },
    {
      icon: '🎨',
      title: 'Wide Selection',
      description: 'Choose from hundreds of styles, colors, and sizes.',
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Our customer support team is always here to help you.',
    },
    {
      icon: '⭐',
      title: 'Quality Products',
      description: 'Every product is carefully selected to meet our quality standards.',
    },
  ];

  return (
    <div className='features'>
      {/* ===============================
          Hero Section
      =============================== */}
      <div className='features__hero'>
        <h1 className='features__hero-title'>Why Choose Rivo?</h1>
        <p className='features__hero-subtitle'>
          We are committed to providing you with the best shopping experience possible.
        </p>
      </div>

      {/* ===============================
          Features Grid
      =============================== */}
      <div className='features__grid'>
        {features.map((feature, idx) => (
          <div key={idx} className='features__card'>
            <span className='features__card-icon'>{feature.icon}</span>
            <h3 className='features__card-title'>{feature.title}</h3>
            <p className='features__card-description'>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* ===============================
          Banner Section
      =============================== */}
      <div className='features__banner'>
        <h2 className='features__banner-title'>Start Shopping Today</h2>
        <p className='features__banner-subtitle'>
          Join thousands of happy customers who trust Rivo for their fashion needs.
        </p>
        <a href='/shop' className='features__banner-btn'>
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default Features;