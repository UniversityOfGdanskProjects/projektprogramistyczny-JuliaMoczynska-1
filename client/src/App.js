// import React, { useEffect } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import HomeScreen from './Screens/HomeScreen';
// import MoviesPage from './Screens/Movies';
// import NotFound from './Screens/NotFound';
// import SingleMovie from './Screens/SingleMovie';
// import Login from './Screens/Login';
// import Register from './Screens/Register';
// import Profile from './Screens/Dashboard/Profile';
// import Aos from 'aos';
// import 'aos/dist/aos.css';
// import Password from './Screens/Dashboard/Password';
// import FavoritesMovies from './Screens/Dashboard/FavoritesMovies';
// import IgnoredMovies from './Screens/Dashboard/IgnoredMovies';
// import WatchList from './Screens/Dashboard/Watchlist';
// import Dashboard from './Screens/Dashboard/Admin/Dashboard';
// import Users from './Screens/Dashboard/Admin/Users';
// import ScrollOnTop from './ScrollOnTop';
// import { UserProvider } from './Context/Context';
// import EditMovie from './Screens/Dashboard/Admin/EditMovie';
// import AddMovie from './Screens/Dashboard/Admin/AddMovie';
// import MovieChat from './Components/Single/MovieChat';
// import MovieForm from './Components/Single/MovieForm';

// import Nav from './Components/Nav';
// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import keycloak from "./Keycloak"
// import PrivateRoute from "./helpers/PrivateRoute";

// function App() {

//   useEffect(() => {
//     Aos.init();
//   },[]);

//   return (
//     <UserProvider>
//       <ReactKeycloakProvider authClient={keycloak}>
//         <Nav />
//         <ScrollOnTop>
//           <Routes>
//             <Route path='/' element={<HomeScreen />} />
//             <Route path='/movies' element={<MoviesPage />}/>
//             <Route path="/movies/:search" element={<MoviesPage />} />
//             <Route path='/movie/:id' element={<SingleMovie />}/>
//             <Route path='/login' element={<Login />}/>
//             <Route path='/register' element={<Register />}/>
//             <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>}/>
//             <Route path='/password' element={<PrivateRoute><Password /></PrivateRoute>}/>
//             <Route path='/favorites' element={<PrivateRoute><FavoritesMovies /></PrivateRoute>}/>
//             <Route path='/ignore' element={<PrivateRoute><IgnoredMovies /></PrivateRoute>}/>
//             <Route path='/watchlist' element={<PrivateRoute><WatchList /></PrivateRoute>}/>
//             <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
//             <Route path='/users' element={<PrivateRoute><Users /></PrivateRoute>}/>
//             <Route path='/addmovie' element={<PrivateRoute><AddMovie /></PrivateRoute>}/>
//             <Route path="/edit/:id" element={<PrivateRoute><EditMovie /></PrivateRoute>} />
//             <Route path="/chats" element={<MovieChat />} />
//             <Route path="/movieform" element={<MovieForm />} />
//             <Route path='*' element={<NotFound />}/>
//           </Routes>
//         </ScrollOnTop>
//       </ReactKeycloakProvider>
//     </UserProvider>
  
    
//   );
// }

// export default App;


import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import MoviesPage from './Screens/Movies';
import NotFound from './Screens/NotFound';
import SingleMovie from './Screens/SingleMovie';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Dashboard/Profile';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Password from './Screens/Dashboard/Password';
import FavoritesMovies from './Screens/Dashboard/FavoritesMovies';
import IgnoredMovies from './Screens/Dashboard/IgnoredMovies';
import WatchList from './Screens/Dashboard/Watchlist';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import Users from './Screens/Dashboard/Admin/Users';
import ScrollOnTop from './ScrollOnTop';
import { UserProvider } from './Context/Context';
import EditMovie from './Screens/Dashboard/Admin/EditMovie';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';
import MovieChat from './Components/Single/MovieChat';
import MovieForm from './Components/Single/MovieForm';

// import keycloak from "./Keycloak";
// import Keycloak from "keycloak-js";
// import { useKeycloak } from '@react-keycloak/web';


function App() {
  
  useEffect(() => {
    Aos.init();
  },[]);

  return (
    <UserProvider>
      <ScrollOnTop>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/movies' element={<MoviesPage />}/>
        <Route path="/movies/:search" element={<MoviesPage />} />
        <Route path='/movie/:id' element={<SingleMovie />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/password' element={<Password />}/>
        <Route path='/favorites' element={<FavoritesMovies />}/>
        <Route path='/ignore' element={<IgnoredMovies />}/>
        <Route path='/watchlist' element={<WatchList />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/users' element={<Users />}/>
        <Route path='/addmovie' element={<AddMovie />}/>
        <Route path="/edit/:id" element={<EditMovie />} />
        {/* <Route path="/chats" element={<MovieChat />} /> */}
        {/* <Route path="/movieform" element={<MovieForm />} /> */}
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </ScrollOnTop>

    </UserProvider>
  
    
  );
}

export default App;