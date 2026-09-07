import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { siteConfig } from '../../config';

export default function HeroSlider() {
  return (
    <section id="accueil" className="hero-section">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Keyboard, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        a11y={{ enabled: true }}
        loop={true}
        className="hero-swiper"
      >
        {siteConfig.heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <h1 className="hero-title">
                  {index === 0 ? (
                    <>
                      Votre partenaire <span className="accent">sourcing & conseil</span> en Chine
                    </>
                  ) : index === 1 ? (
                    <>
                      Contrôle qualité <span className="accent">rigoureux</span> et fiable
                    </>
                  ) : index === 2 ? (
                    <>
                      Assistance <span className="accent">admission & visa</span> simplifiée
                    </>
                  ) : (
                    <>
                      Support business <span className="accent">complet</span> pour votre réussite
                    </>
                  )}
                </h1>
                <p className="hero-description">
                  {siteConfig.description}
                </p>
                <div className="hero-buttons">
                  <a href="#services" className="hero-btn hero-btn-primary">
                    Découvrir nos services
                  </a>
                  <a href="#contact" className="hero-btn hero-btn-secondary">
                    Contactez-nous
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}