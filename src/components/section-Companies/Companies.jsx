// import Marquee from "react-fast-marquee";
import { Marquee } from "@mantine/core";
import classes from "./Companies.module.css";

const imageCompanies = [
  {
    image:
      "src/components/section-Companies/brands/adidas.png",
    // width: "150px",
    // height: "50px",
  },
  {
    image:
      "src/components/section-Companies/brands/Asics.png",
    // width: "150px",
    // height: "50px",
  },
  {
    image:
      "src/components/section-Companies/brands/Columbia.png",

    // width: "150px",
    // height: "50px",
  },
  {
    image: "src/components/section-Companies/brands/decathlon.png",
    // width: "150px",
    // height: "50px",
  },
  {
    image:
      "src/components/section-Companies/brands/fila.png",
    // width: "100px",
    // height: "80px",
  },
  {
    image:
      "src/components/section-Companies/brands/NB.png",
    // width: "200px",
    // height: "60px",
  },
  {
    image: "src/components/section-Companies/brands/nike.png",
    // width: "180px",
    // height: "90px",
  },
  {
    image: "src/components/section-Companies/brands/puma.png",
    // width: "180px",
    // height: "90px",
  },
  {
    image:
      "src/components/section-Companies/brands/reebok.png",
    // width: "190px",
    // height: "100px",
  },
  {
    image: "src/components/section-Companies/brands/UA.png",
    // width: "180px",
    // height: "100px",
  }
];

export default function Companies() {
  return (
    <div>
      <div className={classes.back}>
        <div className={classes.up}>
          <Marquee duration={20000}  maw={1400} >
            <div className={classes.image}>
              {imageCompanies.map((item, indx) => (
                <span key={indx}>
                  <img
                    className={classes.imagesBrands}
                    src={item.image}
                    
                  />
                </span>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}
