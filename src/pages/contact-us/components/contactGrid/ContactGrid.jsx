import { useEffect, useRef, useState } from "react";
import styles from "./ContactGrid.module.css";
import { IoEarth, IoShareSocialOutline } from "react-icons/io5";

const contactDetails = [
  {
    label: "Electronic Mail",
    content: (s) => (
      <a href="mailto:info@minimal.com" className={s.detailValue}>
        info@minimal.com
      </a>
    ),
  },
  {
    label: "Voice Comms",
    content: (s) => (
      <a href="tel:+1234567890" className={s.detailValue}>
        +1 234 567 890
      </a>
    ),
  },
  {
    label: "Global Hub",
    content: (s) => (
      <address className={s.detailValue}>
        123 Performance Way
        <br />
        Cairo Flagship Hub
        <br />
        Cairo, Egypt{" "}
      </address>
    ),
  },
];

const BTN_STATES = {
  IDLE: { label: "Send Inquiry", disabled: false, bg: "#000000", opacity: 1 },
  LOADING: {
    label: "TRANSMITTING...",
    disabled: true,
    bg: "#000000",
    opacity: 0.5,
  },
  SUCCESS: {
    label: "INQUIRY RECEIVED",
    disabled: true,
    bg: "#4c4546",
    opacity: 1,
  },
};

export default function ContactGrid() {
  const ref = useRef(null);
  const [btnState, setBtnState] = useState("IDLE");

  /* Scroll reveal */
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnState("LOADING");
    setTimeout(() => {
      setBtnState("SUCCESS");
      setTimeout(() => {
        setBtnState("IDLE");
        e.target.reset();
      }, 2000);
    }, 1500);
  };

  const btn = BTN_STATES[btnState];

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.grid}>
        {/* ── Left: Details ── */}
        <div className={styles.details}>
          {contactDetails.map((item) => (
            <div key={item.label} className={styles.detailBlock}>
              <span className={styles.detailLabel}>{item.label}</span>
              {item.content(styles)}
            </div>
          ))}

          <div className={styles.socials}>
            <button  className={styles.socialBtn} aria-label={"icon"}>
              <span className="material-symbols-outlined">
                <IoShareSocialOutline size={30} />
              </span>
            </button>

            <button  className={styles.socialBtn} aria-label={"icon"}>
              <span className="material-symbols-outlined">
                <IoEarth size={30} />
              </span>
            </button>
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div className={styles.formWrapper}>
          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.label} htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className={styles.input}
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    type="text"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className={styles.input}
                    id="email"
                    name="email"
                    placeholder="email@example.com"
                    required
                    type="email"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="subject">
                    Inquiry Subject
                  </label>
                  <input
                    className={styles.input}
                    id="subject"
                    name="subject"
                    placeholder="General Inquiry"
                    required
                    type="text"
                  />
                </div>

                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.label} htmlFor="message">
                    Detailed Message
                  </label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    required
                    rows={4}
                  />
                </div>
              </div>

              <div className={styles.formFooter}>
                <button
                  className={styles.submitBtn}
                  type="submit"
                  disabled={btn.disabled}
                >
                  <span className={styles.btnText}>{btn.label}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
