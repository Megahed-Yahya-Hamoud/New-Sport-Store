import {
  Group,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderStyle.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IconHeart, IconLogout, IconShoppingCart } from "@tabler/icons-react";
import API_CONFIG from "../../core/utils/apiConfig";
import { useEffect, useState } from "react";

export function Header() {
  const endpointForUsers = API_CONFIG.endpoints.users.allUsers;
  const navigateTo = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const getUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetch(API_CONFIG.mainUrl + endpointForUsers + getUser)
      .then((res) => res.json())
      .then((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
      });
  }, []);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const link = [
    {
      id: 1,
      title: "Home",
      link: "/",
    },
    {
      id: 2,
      title: "About",
      link: "/aboutUs",
    },
  ];

  const item = link.map((ele) => (
    <Link key={ele.id} to={ele.link} className={classes.link}>
      {ele.title}
    </Link>
  ));

  const itemLarge = link.map((ele) => (
    <Link key={ele.id} to={ele.link} className={classes.linkLarge}>
      {/* <Box px={20} py={15}> */}
      {ele.title}
      {/* </Box> */}
    </Link>
  ));

  const userIcon = (
    <Text className={classes.userIcon}>{firstName?.[0]?.toUpperCase()}</Text>
  );

  const userName = (
    <Group gap={5}>
      {userIcon}
      <Text fz={18} fw={600}>
        {firstName} {lastName}
      </Text>
    </Group>
  );

  const logo = (
    <Link to={"/"} style={{ textDecoration: "none" }}>
      <Text style={{fontFamily:"fantasy"}}  fz={30} className={classes.logoSport}>
        Sports
      </Text>
    </Link>
  );

  function logOut() {
    localStorage.clear();
    navigateTo("/login");
    window.location.reload();
  }

  return (
    <Box pt={15} className={classes.parent}>
      <header className={classes.header}>
        <Group
          justify="space-between"
          style={{ alignItems: "center" }}
          h="100%"
        >
          <Group h="100%" className={classes.itemLargeGroup} visibleFrom="sm">
            {itemLarge}{" "}
          </Group>
          {/* <MantineLogo size={30} /> */}
          <Box className={getUser ? classes.logoInUser : classes.logo}>
            {logo}
          </Box>
          <Group visibleFrom="sm">
            {!getUser ? (
              <>
                <Link className={classes.login} to={"/login"} variant="default">
                  Log in
                </Link>
                <Link className={classes.signup} to={"/sign-up"}>
                  Sign up
                </Link>
              </>
            ) : (
              <Box className={classes.user}>
                <Link
                  title="Shopping-cart"
                  to={"/shopping-cart"}
                  className={classes.icons}
                >
                  <IconShoppingCart stroke={2} size={30} />
                </Link>
                <Link
                  title="Favorites"
                  to={"/favorites"}
                  className={classes.icons}
                >
                  <IconHeart stroke={2} size={30} />
                </Link>
                <Link
                  title="Logout"
                  className={classes.icons}
                  onClick={() => logOut()}
                >
                  <IconLogout size={30} stroke={2} />
                </Link>
                {userIcon}
              </Box>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="80%"
        padding="md"
        title={!getUser ? logo : userName}
        hiddenFrom="sm"
        zIndex={10000000}
      >
        <ScrollArea h={`calc(95vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          {item}

          {!getUser ? <Divider my="sm" /> : <></>}
          <Group>
            {!getUser ? (
              <>
                <Box className={classes.btnInNav}>
                  <Link className={classes.loginInNav} to={"/login"}>
                    Log in
                  </Link>
                  <Link className={classes.signupInNav} to={"/sign-up"}>
                    Sign up
                  </Link>
                </Box>
              </>
            ) : (
              <Box className={classes.secondUser}>
                <Link
                  style={{ marginTop: "0px" }}
                  to={"/shopping-cart"}
                  className={classes.link}
                >
                  Shopping cart
                </Link>
                <Link to={"/favorites"} className={classes.link}>
                  Favorites
                </Link>
                <Link className={classes.link} onClick={() => logOut()}>
                  Logout
                </Link>
              </Box>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
