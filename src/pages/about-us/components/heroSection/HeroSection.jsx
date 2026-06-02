import { useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
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
    <section className={styles.hero}>
      <div className={styles.inner} ref={ref}>
        <span className={styles.eyebrow}>ESTABLISHED IN 2024</span>
        <h1 className={styles.title}>OUR STORY</h1>
        <p className={styles.description}>
          We strive to provide the best sports equipment that combines high
          performance and innovative design. Our store is built on the idea
          that sports are not just an activity, but a way of life.
        </p>
      </div>
    </section>
  );
}