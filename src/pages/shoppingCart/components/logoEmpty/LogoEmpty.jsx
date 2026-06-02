import { Box, Image, Text } from "@mantine/core";
import classes from "./LogoEmpty.module.css";
import IsEmpty from "../../../../assets/6024626.webp";
import { Link } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";

export default function LogoEmpty() {
  return (
    <Box mt={50} display={"flex"} style={{ justifyContent: "center" }}>
      <Box w={"70%"}>
        <Box
          display={"flex"}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Image src={IsEmpty} h={250} w={250} />
        </Box>
        <Text fw={600} mt={-20} fz={25} ta={"center"}>
          your cart is empty
        </Text>
        
        <Box
          mt={60}
          mb={40}
          style={{ display: "flex", justifyContent: "start" }}
        >
          <Link to={"/"} className={classes.btnShopping}>
            <IconChevronLeft
              style={{ width: "20px", height: "20px" }}
              className={classes.arrow}
            />
            <Text className={classes.TextBtn}>Go Shopping</Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
