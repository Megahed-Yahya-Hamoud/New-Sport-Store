import { Box, Button, Text } from "@mantine/core";
import classes from "./SummaryStyle.module.css";
import { Link } from "react-router-dom";
export default function Summary({ finalTotal }) {
  return (
    <Box className={classes.summary}>
      <Text ta={"center"} fw={500} fz={20}>
        Order Summary
      </Text>
      <Box className={classes.line}></Box>
      <Box pl={15} pt={5}>
        <Box display={"flex"} style={{ justifyContent: "start" }}>
          <Text mr={100}>Price:</Text>
          <Text key={""}>${finalTotal}</Text>
        </Box>
        <Box display={"flex"} style={{ justifyContent: "start" }}>
          <Text mr={73}>Delivery:</Text>
          <Text ml={6} c={"green"}>
            Free
          </Text>
        </Box>
        <Box
          display={"flex"}
          style={{ justifyContent: "start" }}
        ></Box>
      </Box>
      <Box className={classes.line}></Box>
      <Box className={classes.totalPrice}>
        <Text className={classes.textTotal} fz={20} fw={500}>
          Total Price:
        </Text>
        <Text fz={20} fw={500}>
          ${finalTotal}
        </Text>
      </Box>
      <Box pl={15} pt={10} display={"flex"} style={{ justifyContent: "start" }}>
        <Link to={"/payment"}>
          <Button className={classes.payBtn}>Proceed to Pay</Button>
        </Link>
      </Box>
    </Box>
  );
}
