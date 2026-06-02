import { Text, ActionIcon, Group, rem, Box } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandFacebook,
} from "@tabler/icons-react";
import classes from "./FooterStyle.module.css";
import { Link } from "react-router-dom";

export function Footer() {

  return (
    <footer className={classes.footer}>
      <Box className={classes.firstFooter}>
        <Box>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Text fz={30} className={classes.logoSport}>
              Sports
            </Text>
          </Link>
        </Box>

        <Box className={classes.links}>
          <Link to={"/"} className={classes.link}>
            Products
          </Link>
          <Link to="/" className={classes.link}>
            latest Products
          </Link>
          <Link to="/aboutUs" className={classes.link}>
            About
          </Link>
          <Link to="/contactUs" className={classes.link}>
            Contact-us
          </Link>
          <Link to="/" className={classes.link}>
            Supports
          </Link>
        </Box>

        <Box>
          <Group
            gap={0}
            className={classes.social}
            justify="flex-end"
            wrap="nowrap"
          >
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandTwitter
                style={{ width: rem(22), height: rem(22), color: "white" }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandFacebook
                style={{ width: rem(22), height: rem(22), color: "white" }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram
                style={{ width: rem(22), height: rem(22), color: "white" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Box>
      </Box>

      <Box className={classes.lastFooter}>
        <Box className={classes.links} style={{ gap: "1rem" }}>
          <Text>© 2026 Sports</Text>
          <Text>Terms</Text>
          <Text>Privacy</Text>
          <Text>Cookies</Text>
        </Box>
        <Box className={classes.links} style={{ gap: "1rem" }}>
          <Text>T-shirts</Text>
          <Text>Caps</Text>
          <Text>Shoes</Text>
          <Text>Socks</Text>
          <Text>Football</Text>
        </Box>
      </Box>
    </footer>
  );
}
