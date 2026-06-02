import classes from "./CarouselImages.module.css";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

export default function CarouselImages({ images }) {
  return (
    <Carousel
      withIndicators
      className={classes.carousel}
      emblaOptions={{ dragFree: true, align: "start" }}
      slideGap="md"
      emblaOptions={{
        loop: true,
      }}
      controlsOffset="xs"
      styles={{
        indicator: {
          backgroundColor: "black",
        },
      }}
    >
      {images &&
        images.map((image) => (
          <Carousel.Slide
          key={image}
            display={"flex"}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Image src={image} />
          </Carousel.Slide>
        ))}
    </Carousel>
  );
}
