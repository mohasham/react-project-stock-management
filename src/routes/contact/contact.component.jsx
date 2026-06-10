import { useState } from 'react';
import './contact.styles.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ===============================
  // Validate Form
  // ===============================
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  // ===============================
  // Handle Submit
  // ✅ static for now — no backend needed
  // TODO: add email service (e.g. nodemailer) later
  // ===============================
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // ✅ show success message
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // ✅ clear error when user starts typing
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  return (
    <div className='contact'>

      {/* ===============================
          Hero Section
      =============================== */}
      <div className='contact__hero'>
        <h1 className='contact__hero-title'>Contact Us</h1>
        <p className='contact__hero-subtitle'>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className='contact__content'>

        {/* ===============================
            Contact Info
        =============================== */}
        <div className='contact__info'>
          <h2 className='contact__info-title'>Get In Touch</h2>

          <div className='contact__info-item'>
            <span className='contact__info-icon'>📍</span>
            <div>
              <h3>Address</h3>
              <p>Sidon, South Lebanon</p>
            </div>
          </div>

          <div className='contact__info-item'>
            <span className='contact__info-icon'>📞</span>
            <div>
              <h3>Phone</h3>
              <p>+961 70 000 000</p>
            </div>
          </div>

          <div className='contact__info-item'>
            <span className='contact__info-icon'>📧</span>
            <div>
              <h3>Email</h3>
              <p>support@rivo.com</p>
            </div>
          </div>

          <div className='contact__info-item'>
            <span className='contact__info-icon'>🕐</span>
            <div>
              <h3>Working Hours</h3>
              <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* ===============================
            Contact Form
        =============================== */}
        <div className='contact__form-wrapper'>
          {submitted ? (
            // ✅ success message after form submission
            <div className='contact__success'>
              <span className='contact__success-icon'>✅</span>
              <h3>Message Sent!</h3>
              <p>Thank you for contacting us. We will get back to you shortly.</p>
              <button
                className='contact__success-btn'
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='contact__form'>
              <h2 className='contact__form-title'>Send a Message</h2>

              {/* Name */}
              <div className='contact__form-field'>
                <label>Name</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your full name'
                />
                {errors.name && <p className='contact__form-error'>{errors.name}</p>}
              </div>

              {/* Email */}
              <div className='contact__form-field'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Your email address'
                />
                {errors.email && <p className='contact__form-error'>{errors.email}</p>}
              </div>

              {/* Subject */}
              <div className='contact__form-field'>
                <label>Subject</label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder='What is this about?'
                />
                {errors.subject && <p className='contact__form-error'>{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className='contact__form-field'>
                <label>Message</label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Write your message here...'
                  rows={5}
                />
                {errors.message && <p className='contact__form-error'>{errors.message}</p>}
              </div>

              <button type='submit' className='contact__form-btn'>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;