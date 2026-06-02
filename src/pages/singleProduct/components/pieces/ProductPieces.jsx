import { Box, Button, Group, Text } from "@mantine/core";
import classes from "./ProductPieces.module.css";
import { useCounter } from "@mantine/hooks";

export default function ProductPieces({quantity}) {
      const [count, handlers] = useCounter(1, { min: 1 });
    
  return (
    <Box className={classes.containerPieces}>
      <Text
        className={classes.title}
        fz={18}
        mb={10}
        fw={700}
        c={"black"}
      >
        Pieces:
      </Text>
      <Group className={classes.containerCounter}>
        <Button
        className={classes.btn}
          color="black"
          c={"white"}
          onClick={() => {
            if (count < quantity) {
              handlers.increment();
            }
          }}
        >
          +
        </Button>
        <Text w={20} ta={"center"}>
          {count}
        </Text>
        <Button 
        className={classes.btn}
         color="black" c={"white"} onClick={handlers.decrement}>
          -
        </Button>
      </Group>
    </Box>
  );
}
