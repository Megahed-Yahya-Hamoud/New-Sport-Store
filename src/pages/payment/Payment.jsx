import { Box } from '@mantine/core'
import classes from './Payment.module.css'
import ProductsPay from './components/products/ProductsPay'
import PaymentCard from './components/paymentCard/PaymentCard';


export default function Payment() {
  

  return (
    <Box className={classes.parent}>
        <Box className={classes.firstCard}>
            <ProductsPay/>
        </Box>
        <Box className={classes.secondeCard}>
            <PaymentCard/>
        </Box>
    </Box>
  )
}
