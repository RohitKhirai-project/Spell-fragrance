import React from 'react';
import './TermsAndPolicies.css'; // Optional for styling

const TermsAndPolicies = () => {
  return (
    <div className="terms-page">
      <div className="container">
        <h2>Terms and Policies</h2>

        <section className="policy-section">
          <h3>Terms and Conditions</h3>
          <p>
            By accessing and using our website, you agree to comply with our terms and conditions.
            All purchases are subject to availability and confirmation of the order price.
            We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion.
          </p>
        </section>

        <section className="policy-section">
          <h3>Refund Policy</h3>
          <p>
            If you're not satisfied with your purchase, you may request a refund within 7 days of receiving the product.
            The product must be unused and in its original packaging. Shipping fees are non-refundable.
            Please contact our support team to initiate a refund process.
          </p>
        </section>

        <section className="policy-section">
          <h3>Shipping and Returns</h3>
          <p>
            We offer shipping across India. Orders are typically processed within 2-3 business days.
            In case of returns, the customer is responsible for return shipping costs unless the item is defective.
            Returned items must be in their original condition for a full refund.
          </p>
        </section>

        <section className="policy-section">
          <h3>Terms of Service</h3>
          <p>
            Our services are provided "as is" without any warranties, express or implied.
            We are not liable for any damages arising from the use of our website or products.
            By using our site, you agree to our full Terms of Service.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndPolicies;
