import { Box, Button, Text } from "@mantine/core";
import classes from "./PaymentCard.module.css";

export default function PaymentCard() {
  return (
    <Box className={classes.parent}>
      <Box className={classes.containerField}>
        <Text fw={500} fz={20} pb={16} ta={"start"}>
          Pay with card
        </Text>
        <form>
          <Box display={"grid"} ta={"start"}>
            <label className={classes.label}>Email</label>
            <input type="email" className={classes.emailField} placeholder="youremail@gmail.com" required/>
          </Box>
          <Box display={"grid"} ta={"start"}>
            <label className={classes.label}>Card information</label>
            <Box>
              <input
                type="text"
                className={classes.numberCard}
                placeholder="1234 1234 1234 1234"
                required
              />
              <Box display={"flex"} className={classes.containerFieldData}>
                <input
                  type="text"
                  className={classes.dateCard}
                  placeholder="MM / YY"
                  required
                />
                <input
                  type="text"
                  className={classes.passCard}
                  placeholder="CVC"
                  required
                />
              </Box>
            </Box>
          </Box>
          <Box display={"grid"} ta={"start"}>
            <label className={classes.label}>Cardholder name</label>
            <input
              type="text"
              placeholder="Full name on card"
              className={classes.emailField}
              required
            />
          </Box>
          <Box display={"grid"} ta={"start"}>
            <label className={classes.label}>Billing address</label>
            <select className={classes.selectField}>
              <option value="1" selected required>
                Egypt
              </option>
              <option value="2">USA</option>
              <option value="3">Franc</option>
              <option value="4">Italia</option>
              <option value="5">Germany</option>
            </select>
            <input
              type="text"
              className={classes.addressField}
              placeholder="Address line 1"
              required
            />
            <input
              type="text"
              className={classes.addressField}
              placeholder="Address line 2 "
              required
            />
            <input
              type="text"
              className={classes.addressField}
              placeholder="City"
              required
            />
            <select className={classes.secondeSelectField}>
              <option value="0" disabled selected required >
                Province
              </option>
              <option value="1">USA</option>
              <option value="2">Franc</option>
              <option value="3">Italia</option>
              <option value="4">Germany</option>
            </select>
            <input type="text" className={classes.postalField} placeholder="Postal code"  required/>
          </Box>

          <Box mt={16} display={"flex"} style={{justifyContent:"start"}}  >
          <Button className={classes.btn} h={45} fz={17} type="submit">Pay Now</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
