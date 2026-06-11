import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import '@mantine/carousel/styles.css';
import "@mantine/notifications/styles.css";
import { BrowserRouter } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react";
import Loading from "./components/loading/Loading.jsx";
import { UserProvider } from "./core/contexts/UserContext.jsx";
export const LazyLoading = React.lazy(() => import("./App.jsx"));

const theme = createTheme({
  /** Put your mantine theme override here */
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NuqsAdapter>
      <MantineProvider theme={theme}>
        <UserProvider>
          <Notifications position="top-right" zIndex={100000} />
          <BrowserRouter>
            <React.Suspense fallback={<Loading />}>
              <LazyLoading />
            </React.Suspense>
          </BrowserRouter>
        </UserProvider>
      </MantineProvider>
    </NuqsAdapter>
  </StrictMode>,
);
