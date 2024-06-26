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
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import Users from './Screens/Dashboard/Admin/Users';
import ScrollOnTop from './ScrollOnTop';
import { UserProvider } from './Context/Context';
import EditMovie from './Screens/Dashboard/Admin/EditMovie';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';

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
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/users' element={<Users />}/>
        <Route path='/addmovie' element={<AddMovie />}/>
        <Route path="/edit/:id" element={<EditMovie />} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </ScrollOnTop>

    </UserProvider>
  
    
  );
}

export default App;
