import React from 'react';
import FormInput from '../form-input/form-input.component';
import './footer.styles.scss';

const Footer = () => {
  return (
     <footer className="footer">
      <div className="footer__content">
        {/* Brand + Social */}
        <div className="footer__section">
  <h2 className="footer__brand">Rivo</h2>
  <p className="footer__social-title">Social Media</p>
  <div className="footer__icons">
    <i className="bi bi-facebook"></i>
    <i className="bi bi-twitter"></i>
    <i className="bi bi-instagram"></i>
  </div>
</div>


        {/* Shop */}
        <div className="footer__section">
          <h3 className="footer__title">SHOP</h3>
          <ul>
            <li>Products</li>
            <li>Overview</li>
            <li>Pricing</li>
            <li>Releases</li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer__section">
          <h3 className="footer__title">COMPANY</h3>
          <ul>
            <li>About us</li>
            <li>Contact</li>
            <li>News</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer__section">
          <h3 className="footer__title">STAY UP TO DATE</h3>
          <form className="footer__form">
            <input
              type="email"
              placeholder="Enter your email"
              className="footer__input"
            />
             {/* <FormInput
              label="Email"
              type="email"
              value=""
              onChange={() => {}} // no-op function, just prevents React warning
              required
            /> */}
            <button type="submit" className="footer__button">
              SUBMIT
            </button>
          </form>
        </div>
      </div>

     {/* Bottom */}
<div className="footer__bottom-wrapper">
  <div className="footer__line"></div>
  <div className="footer__bottom">
    <a href="#">Terms</a>
    <a href="#">Privacy</a>
    <a href="#">Cookies</a>
  </div>
</div>
</footer>

  );
};

export default Footer;
