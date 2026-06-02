import classes from "./QuantityStyle.module.css";
import { Box, Text } from "@mantine/core";
import { IconMinus, IconPlus, IconRefresh } from "@tabler/icons-react";
import { useState } from "react";

export default function Quantity({ quantity, price, onQtyChange }) {
  const [count, setCount] = useState(1);

  function increment() {
    if (count < quantity) {
      const newCount = count + 1;
      setCount(newCount);
      onQtyChange(newCount);
    }
  }

  function decrement() {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onQtyChange(newCount);
    }
  }

  function reset() {
    const newCount = 1;
    setCount(newCount);
    onQtyChange(newCount);
  }
  return (
    <Box className={classes.qty}>
      <Text fw={600} className={classes.qtyText}>
        Qty:
      </Text>
      <Box className={classes.containerCounter}>
        <IconPlus className={classes.counterIcons} onClick={increment} />

        <Text className={classes.counter}>{count}</Text>

        <IconMinus className={classes.counterIcons} onClick={decrement} />
      </Box>
      <IconRefresh className={classes.counterIcons} onClick={reset} />
      <Text fw={600}>Total: ${Number(price) * count}</Text>{" "}
    </Box>
  );
}
