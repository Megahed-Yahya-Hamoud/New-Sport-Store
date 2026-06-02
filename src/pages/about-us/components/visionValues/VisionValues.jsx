import { useEffect, useRef } from "react";
import styles from "./VisionValues.module.css";

const values = [
  {
    number: "01",
    title: "Accuracy",
    description:
      "We don't compromise on details to ensure the highest levels of quality in everything we offer.",
  },
  {
    number: "02",
    title: "Originality",
    description:
      "We are committed to providing original products that reflect our passion for sports and innovation.",
  },
  {
    number: "03",
    title: "Sustainability",
    description:
      "We focus on sustainable solutions that preserve our environment and ensure a better future for the coming generations.",
  },
];

export default function VisionValues() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add(styles.visible),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.grid} ref={ref}>

        {/* Vision */}
        <div className={styles.col}>
          <h2 className={styles.heading}>OUR VISION</h2>
          <p className={styles.bodyText}>
            Our vision is to redefine the future of sports equipment through
            continuous innovation. We believe that every athlete deserves tools
            that help them go beyond their limits and achieve their goals.
          </p>
          <p className={styles.bodyText}>
            We don't just sell products; we design inspiring experiences that
            push everyone toward a healthier and more active lifestyle.
          </p>
        </div>

        {/* Values */}
        <div className={styles.col}>
          <h2 className={styles.heading}>OUR VALUES</h2>
          <ul className={styles.valueList}>
            {values.map((v) => (
              <li key={v.number} className={styles.valueItem}>
                <span className={styles.valueNumber}>{v.number}</span>
                <div>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}