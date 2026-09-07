import { useState } from 'react';

const endpoint = import.meta.env.PUBLIC_TESTIMONIAL_ENDPOINT;

export default function TestimonialForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    image: '',
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
        setFormData({ name: '', role: '', text: '', image: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="testimonial-form-wrapper">
      {/* Bouton fermer */}
      <button
        type="button"
        className="btn-close-form"
        onClick={onClose}
        aria-label="Fermer le formulaire"
      >
        ✕
      </button>

      <form onSubmit={handleSubmit} className="testimonial-form">
        <h3>Partagez votre expérience</h3>

        <div className="form-group">
          <label htmlFor="testimonial-name">Nom complet</label>
          <input
            type="text"
            id="testimonial-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom et prénom"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="testimonial-role">Fonction / Entreprise</label>
          <input
            type="text"
            id="testimonial-role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Ex : Directeur, Société ABC"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="testimonial-text">Votre témoignage</label>
          <textarea
            id="testimonial-text"
            name="text"
            rows="4"
            value={formData.text}
            onChange={handleChange}
            placeholder="Partagez votre expérience avec AegisNova..."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="testimonial-image">URL de votre photo (optionnel)</label>
          <input
            type="url"
            id="testimonial-image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://exemple.com/photo.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-testimonial btn-submit"
        >
          {status === 'sending' ? 'Envoi...' : 'Envoyer'}
        </button>

        {status === 'success' && (
          <p className="form-message success">Merci ! Votre témoignage a été envoyé.</p>
        )}
        {status === 'error' && (
          <p className="form-message error">Une erreur est survenue. Réessayez plus tard.</p>
        )}
      </form>
    </div>
  );
}