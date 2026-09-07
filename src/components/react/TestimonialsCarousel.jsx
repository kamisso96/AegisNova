import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { testimonials } from '../../data/testimonials';
import TestimonialForm from './TestimonialForm';

export default function TestimonialsCarousel() {
  const [showForm, setShowForm] = useState(false);

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <section id="temoignages" className="testimonials-section section">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Témoignages</h2>
          <p className="section-subtitle">Ce que nos clients disent de nous</p>
        </div>
      </div>

      {testimonials.length > 0 ? (
        <div className="testimonials-carousel-wrapper">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination, Keyboard, A11y]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            a11y={{ enabled: true }}
            loop={true}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      loading="lazy"
                      width="80"
                      height="80"
                    />
                    <div>
                      <h3 className="testimonial-name">{testimonial.name}</h3>
                      <p className="testimonial-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="container">
          <p className="no-testimonials">
            Aucun témoignage pour le moment. Soyez le premier à partager votre expérience !
          </p>
        </div>
      )}

      <div className="container">
        <div className="testimonial-cta">
          <button
            className="btn-testimonial"
            onClick={() => setShowForm(!showForm)}
          >
            Partager votre expérience
          </button>
        </div>

        {showForm && <TestimonialForm onClose={closeForm} />}
      </div>
    </section>
  );
}