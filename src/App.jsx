import "./App.css";
import { Box } from "@mantine/core";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AboutUs from "./pages/about-us/AboutUs";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Favorites from "./pages/favorites/Favorites";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";
import Login from "./pages/user/login/Login";
import Register from "./pages/user/register/Register";
import NotFound from "./pages/error/NotFound";
import { Header } from "./layout/header/Header";
import { Footer } from "./layout/footer/Footer";
import ContactUs from "./pages/contact-us/ContactUs";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Payment from "./pages/payment/Payment";
import ConfirmationCode from "./pages/user/updatePassword/confirmationCode/ConfirmationCode";
import ConfirmationEmail from "./pages/user/updatePassword/confirmationEmail/ConfirmationEmail";
import ResetPassword from "./pages/user/updatePassword/resetPassword/ResetPassword";

import { useContext } from "react";
import { UserContext } from "./core/contexts/UserContext";
import Loading from "./components/loading/Loading";

function App() {
  const { user, loading } = useContext(UserContext);
  const getUser = user?.id || null;

  if (loading) {
    return (
      <Box display="grid" style={{ alignContent: "center" }} h="100vh">
        <Loading />
      </Box>
    );
  }

  return (
    <Box className="App">
      <ScrollToTop />
      <Header />
      <Box className="style">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/products/:id" element={<SingleProduct />} />

          {/* لو مش مسجل دخول → يمنع favorite */}
          <Route
            path="/favorites"
            element={getUser ? <Favorites /> : <Navigate to="/login" />}
          />

          <Route
            path="/shopping-cart"
            element={getUser ? <ShoppingCart /> : <Navigate to="/login" />}
          />

          <Route
            path="/payment"
            element={getUser ? <Payment /> : <Navigate to="/shopping-cart" />}
          />

          {/* لو مسجل دخول → يمنع login و signup */}
          <Route
            path="/login"
            element={!getUser ? <Login /> : <Navigate to="/" />}
          />

          <Route
            path="/sign-up"
            element={!getUser ? <Register /> : <Navigate to="/" />}
          />

          <Route
            path="/confirmation-email"
            element= { !getUser ? <ConfirmationEmail /> :<Navigate to="/" /> }
          />
          <Route
            path="/confirmation-code"
            element= { !getUser ? <ConfirmationCode /> :<Navigate to="/" /> }
          />
           <Route
            path="/reset-password"
            element= { !getUser ? <ResetPassword /> :<Navigate to="/" /> }
          />

          {/* صفحة خطأ */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
