// import { keycloak } from '../server.js';

// const registerUserInKeycloak = async (userData) => {
//     try {
//       const response = await axios.post(
//         'https://your-keycloak-url/auth/admin/realms/your-realm/users',
//         userData,
//         {
//           headers: {
//             Authorization: 'Bearer your-admin-access-token', // Wymaga tokena dostępowego administratora Keycloak
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       return response.data; // Zwraca dane nowo zarejestrowanego użytkownika
//     } catch (error) {
//       throw new Error('Failed to register user in Keycloak: ' + error.message);
//     }
// };

// export { registerUserInKeycloak };

// const keycloakService = {
//     register: (userData, callback) => {
//       keycloak.register({
//         username: userData.username,
//         email: userData.email,
//         enabled: true,
//       }, callback);
//     },
  
//     login: (userData, callback) => {
//       keycloak.grantManager.obtainDirectly(userData.username, userData.password, callback);
//     },
//   };
  

// export { keycloakService };

