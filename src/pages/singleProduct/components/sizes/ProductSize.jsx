import { Box, Group, Text } from "@mantine/core";
import classes from "./ProductSizeStyle.module.css";
import { useState } from "react";

export default function ProductSize({size=[]}) {

      // const size = ["41", "42", "43", "44", "45"];
    console.log(size);
    
      const [activeSize, setActiveSize] = useState(size[0]||"");
    
      const items = size.map((ele, index) => (
        <Box
          key={index}
          className={classes.size}
          data-active={activeSize === ele || undefined}
          onClick={() => {
            setActiveSize(ele);
          }}
        >
          {ele}
        </Box>
      ));

  return (
    <>
      <Text className={classes.title} fz={18} mb={10} fw={700} c={"black"}>
        Size:
      </Text>
      <Group gap={15}>
        {items}
      </Group>
    </>
  );
}
