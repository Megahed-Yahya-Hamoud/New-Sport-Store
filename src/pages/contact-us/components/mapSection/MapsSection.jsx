import { useEffect, useRef } from "react";
import styles from "./MapsSection.module.css";
import { FaLocationDot } from "react-icons/fa6";

export default function MapSection() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add(styles.visible),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles.section}
      ref={ref}
    >
      <div className={styles.frame}>
        <img
          className={styles.image}
          src="src/pages/contact-us/components/mapSection/screen.png"
          alt="Flagship Location"
        />

        <a href="https://maps.app.goo.gl/Q3JKukY9gBX5x9e59" target="_blank" className={styles.overlay}>
          <div className={styles.badge}>
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              <FaLocationDot size={20} />
              {/* location_on */}
            </span>
            <span className={styles.badgeText}>
              CAIRO FLAGSHIP HUB / 30.0444° N, 31.2357° E{" "}
            </span>
          </div>
        </a>

        <div className={styles.cornerLabel}>FLAGSHIP 01</div>
      </div>
    </section>
  );
}
