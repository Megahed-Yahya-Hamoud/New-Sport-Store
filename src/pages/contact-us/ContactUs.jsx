import classes from "./ContactUsStyle.module.css";
import HeroSection from "./components/heroSection/HeroSection";
import ContactGrid from "./components/contactGrid/ContactGrid";
import MapsSection from "./components/mapSection/MapsSection";

export default function ContactUs() {
  return (
     <div className={classes.app}>
      <main className={classes.main}>
        <div className={classes.pageWrapper}>
          <HeroSection />
          <ContactGrid />
          <MapsSection />
        </div>
      </main>
    </div>
  )
}
