import React from 'react';
import './Services.css';

const services = [
  {
    title: 'FREE SHIPPING',
    description: 'Free Shipping on All Orders',
    icon: '🚚', // You can replace this with an actual icon (e.g., from Font Awesome)
  },
  {
    title: 'SUPPORT 24/7',
    description: 'Contact us 24 hours a day, 7 days a week',
    icon: '📞',
  },
  {
    title: 'MONEY RETURN',
    description: 'Read Shipping & Return',
    icon: '🔄',
  },
  {
    title: '100% PAYMENT SECURE',
    description: 'We ensure secure payment',
    icon: '🔒',
  },
];

const Services = () => {
  return (
    <section className="services-section">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
