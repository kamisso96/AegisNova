import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { realisations } from '../../data/realisations';

export default function RealisationsCarousel() {
  return (
    <section id="realisations" className="realisations-section section">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Nos Réalisations</h2>
          <p className="section-subtitle">Quelques projets récents menés avec succès</p>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Keyboard, A11y]}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        a11y={{ enabled: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
        className="realisations-swiper"
      >
        {realisations.map((item) => (
          <SwiperSlide key={item.id}>
            <article className="realisation-card">
              <div className="realisation-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className="realisation-overlay">
                  <span className="realisation-badge">{item.badge}</span>
                  <h3 className="realisation-title">{item.title}</h3>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}