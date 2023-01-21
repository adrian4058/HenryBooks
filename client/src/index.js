import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { store } from "./store/index";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>    
  </Provider>,
);



// No funciona con React.StricMode

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter } from "react-router-dom";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { Provider } from "react-redux";
// import { store } from "./store/index";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
// console.log(window.location); // redireccionar al Home
// root.render(
//   <React.StrictMode>  
//     <BrowserRouter>
//       <Provider store={store}>
//         <Auth0Provider
//           domain={domain}
//           clientId={clientId}
//           redirectUri={window.location.origin}
//         >
//           <App />
//         </Auth0Provider>
//       </Provider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

