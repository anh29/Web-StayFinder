import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import App from "App";
import "index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import RootStore from "redux/root-store";
import reportWebVitals from "reportWebVitals";
import { uiTheme } from "theme/chakra-theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={RootStore}>
      <ChakraProvider theme={uiTheme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
