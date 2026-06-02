import { Box, Group, Text } from '@mantine/core';
import classes from './LargeSize.module.css'
import { useState } from 'react';

export default function LargeSize() {
    
      const size = ["sm", "md", "lg", "xl", "xxxl"];
     
       const [activeSize, setActiveSize] = useState(size[0]);
     
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
