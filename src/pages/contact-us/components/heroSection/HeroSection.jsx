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
    <section className={styles.hero} ref={ref}>
      <h1 className={styles.title}>GET IN TOUCH</h1>
      <p className={styles.subtitle}>
        Performance is not a destination, it's a constant state of refinement.
        Reach out to our team of specialists for precision guidance on equipment
        and global logistics.
      </p>
    </section>
  );
}