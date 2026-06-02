import { Box, Group, Text } from "@mantine/core";
import classes from "./ProductColorsStyle.module.css";
import { useState } from "react";

export default function ProductColors({colors}) {
  const [activeColor, setActiveColor] = useState("");

  if (!activeColor && colors?.length > 0) {
    setActiveColor(colors[0]);
  }

  const color = colors.map((ele, index) => (
    <Box
      key={index}
      className={classes.color}
      data-active={activeColor === ele || undefined}
      onClick={() => setActiveColor(ele)}
    >
      <Box style={{ borderRadius: "3px" }} h="30px" bg={ele} w="30px" />
    </Box>
  ));

  return (
    <>
      <Text className={classes.title} fz={18} mb={10} fw={700} c="black">
        Remaining colors:
      </Text>

      <Group gap={15} justify="start">
        {color}
      </Group>
    </>
  );
}
