import classes from "./QuantityStyle.module.css";
import { Box, Text } from "@mantine/core";
import { IconMinus, IconPlus, IconRefresh } from "@tabler/icons-react";

export default function Quantity({ count, stock, price, onQtyChange }) {
  function increment() {
    if (count < stock) {
      onQtyChange(count + 1);
    }
  }

  function decrement() {
    if (count > 1) {
      onQtyChange(count - 1);
    }
  }

  function reset() {
    onQtyChange(1);
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
