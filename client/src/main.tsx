import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { Provider } from "react-redux";
import keycloak from "./keycloak";
import { store } from "./store";
import router from "./routes";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{ pkceMethod: "S256" }}
  >
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <MUIThemeProvider theme={theme}>
          <EmotionThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </EmotionThemeProvider>
        </MUIThemeProvider>
      </DndProvider>
    </Provider>
  </ReactKeycloakProvider>
);
