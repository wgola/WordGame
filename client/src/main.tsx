import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Provider } from "react-redux";
import { store } from "./store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
