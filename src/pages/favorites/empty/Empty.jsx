import { Box, Button, Image, Text } from '@mantine/core'
import classes from './Empty.module.css'
import { useNavigate } from 'react-router-dom'
import { IconShoppingCart } from '@tabler/icons-react'
export default function Empty() {

    const navigateTo= useNavigate()


  return (
    <Box className={classes.isEmpty}>
          <Image
            src={"/images/17568937.png"}
            className={classes.imageEmpty}
          />
          <Box className={classes.containerText}>
            <Text className={classes.titlePage}>
              The favorites list is currently empty
            </Text>
            <Text className={classes.secondTitlePage}>
              Add the products you like so you can find them here later
            </Text>
            <Box mt={15} className={classes.boxBtn}>
              <Button onClick={() => navigateTo("/")} className={classes.btn}>
                <IconShoppingCart className={classes.icon} size={27} />
                Going to shopping
              </Button>
            </Box>
          </Box>
        </Box>
  )
}
