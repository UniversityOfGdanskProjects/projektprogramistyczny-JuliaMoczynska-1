import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter} from 'react-router-dom';

// import Nav from './Components/Nav';

// import KeycloakProvider from "./KeycloakProvider";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak.js";

// const eventLogger = (event, error) => {
//   console.log('onKeycloakEvent', event, error);
// };

// const tokenLogger = (tokens) => {
//   console.log('onKeycloakTokens', tokens);
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
   <ReactKeycloakProvider
        authClient={keycloak}
        // onEvent={eventLogger}
        // onTokens={tokenLogger}
        // initOptions={{
        //   pkceMethod: 'S256',
        //   checkLoginIframe: false
        // }}
      >
      <BrowserRouter>
        {/* <Nav /> */}
        <App />
      </BrowserRouter>
    </ReactKeycloakProvider>
  </>
  // <React.StrictMode>
    // <ReactKeycloakProvider
    //     authClient={keycloak}
    //     // onEvent={eventLogger}
    //     // onTokens={tokenLogger}
    //     // initOptions={{
    //     //   pkceMethod: 'S256',
    //     //   checkLoginIframe: false
    //     // }}
    //   >
    //   <BrowserRouter>
    //     {/* <Nav /> */}
    //     <App />
    //   </BrowserRouter>
    // </ReactKeycloakProvider>
    
  // </React.StrictMode>
);

// keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
//   if (authenticated) {
//     const root = ReactDOM.createRoot(document.getElementById('root'));
//     root.render(
//       <React.StrictMode>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </React.StrictMode>
//     );
//   } else {
//     window.location.reload();
//   }
// }).catch(error => {
//   console.error("Keycloak initialization failed", error);
// });