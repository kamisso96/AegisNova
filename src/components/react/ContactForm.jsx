import { useState } from 'react';

const endpoint = import.meta.env.PUBLIC_CONTACT_ENDPOINT;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="contact-form-wrapper">
      <h3 className="contact-form-title">Envoyez-nous un message</h3>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="contact-name">Nom complet *</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Email *</label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-phone">Téléphone *</label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+86 166 1234 5678"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-service">Service souhaité *</label>
          <select
            id="contact-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Sélectionnez un service</option>
            <option value="sourcing">Sourcing & Procurement</option>
            <option value="qualite">Contrôle Qualité & Inspection</option>
            <option value="admission">Assistance Admission & Consultation</option>
            <option value="business">Support Business</option>
            <option value="visa">Voyage, Tourisme & Support Visa</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contact-message">Message *</label>
          <textarea
            id="contact-message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Décrivez votre projet ou votre demande..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-testimonial btn-submit"
        >
          {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>
        {status === 'success' && (
          <p className="form-message success">Merci ! Votre message a bien été envoyé.</p>
        )}
        {status === 'error' && (
          <p className="form-message error">Une erreur est survenue. Veuillez réessayer.</p>
        )}
      </form>
    </div>
  );
}