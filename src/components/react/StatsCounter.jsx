import { useEffect, useRef, useState } from 'react';
import { stats } from '../../data/stats';

export default function StatsCounter() {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setIsAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isAnimated]);

  useEffect(() => {
    if (!isAnimated) return;

    const duration = 2000;
    const startTime = performance.now();

    const updateCounts = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(
        stats.map((stat) => Math.round(stat.value * eased))
      );

      if (progress < 1) {
        requestAnimationFrame(updateCounts);
      }
    };

    requestAnimationFrame(updateCounts);
  }, [isAnimated]);

  return (
    <section id="stats" className="stats-section section" ref={sectionRef}>
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Nos chiffres clés</h2>
          <p className="section-subtitle">La confiance de nos clients en quelques nombres</p>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={stat.id}>
              <div className="stat-number">
                {counts[index]}
                {stat.suffix || ''}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}