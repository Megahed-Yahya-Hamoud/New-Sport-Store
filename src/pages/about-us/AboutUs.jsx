import { Box } from "@mantine/core";
import HeroSection from "./components/heroSection/HeroSection";
import VisionValues from "./components/visionValues/VisionValues";
import Timeline from "./components/timeLine/TimeLine";
import './AboutUsStyle.css'
export default function AboutUs() {
  return (
    <Box>
      <main>
        <HeroSection />
        <VisionValues />
        <Timeline />
      </main>
    </Box>
  );
}
