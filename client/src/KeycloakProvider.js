// import React, { useContext, useState, useEffect } from "react";
// import keycloak from "./Keycloak";
// const KeycloakContext = React.createContext(null);

// export const useKeycloak = () => {
//   const context = useContext(KeycloakContext);

//   if (context === null) {
//     throw new Error("useKeycloak must be used within a KeycloakProvider");
//   }

//   return context;
// };

// const useKeycloakState = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     keycloak
//       .init({
//         onLoad: "check-sso",
//         pkceMethod: "S256",
//         scope: "openid profile email",
//         redirectUri: "http://localhost:3000/login",
//         checkLoginIframe: false,
//       })
//       .then(() => {
//         setIsLoading(false);
//       })
//       .catch(console.error);
//   }, []);

//   return isLoading;
// };

// const KeycloakProvider = ({ children }) => {
//   const isLoading = useKeycloakState();

//   return (
//     <KeycloakContext.Provider value={{ keycloak }}>
//       {!isLoading ? children : "Loading..."}
//     </KeycloakContext.Provider>
//   );
// };

// export default KeycloakProvider;
