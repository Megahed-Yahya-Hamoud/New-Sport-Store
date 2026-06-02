import { useEffect, useRef } from "react";
import styles from "./TimeLine.module.css";

const milestones = [
  {
    number: "01",
    year: "2024",
    title: "Start of the Journey",
    description:
      "Launching our store to provide original sports equipment that meets the needs of professionals and amateurs.",
    align: "right",
  },
  {
    number: "02",
    year: "2025",
    title: "Quality and Originality",
    description:
      "Expanding our partnerships with major global brands to ensure providing 100% original sports products.",
    align: "left",
  },
  {
    number: "03",
    year: "2026",
    title: "Leadership and Innovation",
    description:
      "Becoming the first destination for innovative sports products with a focus on innovation and sports performance development.",
    align: "right",
  },
];

export default function Timeline() {
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
      <div className={styles.inner} ref={ref}>
        <h2 className={styles.heading}>THE TIMELINE</h2>

        <div className={styles.timeline}>
          {/* Vertical line */}
          <div className={styles.line} />

          {milestones.map((m) => (
            <div
              key={m.number}
              className={`${styles.row} ${
                m.align === "left" ? styles.rowLeft : styles.rowRight
              }`}
            >
              {/* Ghost year — desktop only, opposite side */}
              <div className={styles.ghostYear}>
                <span>{m.year}</span>
              </div>

              {/* Centre dot */}
              <div className={styles.dot}>{m.number}</div>

              {/* Card */}
              <div className={styles.cardWrapper}>
                <div className={styles.card}>
                  {/* Year shown inside card on mobile */}
                  <span className={styles.yearMobile}>{m.year}</span>
                  <h3 className={styles.cardTitle}>{m.title}</h3>
                  <p className={styles.cardDesc}>{m.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}