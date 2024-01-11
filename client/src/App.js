import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import MoviesPage from './Screens/Movies';
import NotFound from './Screens/NotFound';
import SingleMovie from './Screens/SingleMovie';
import WatchPage from './Screens/WatchPage';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Dashboard/Profile';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Password from './Screens/Dashboard/Password';
import FavoritesMovies from './Screens/Dashboard/FavoritesMovies';
import IgnoredMovies from './Screens/Dashboard/IgnoredMovies';
import WatchList from './Screens/Dashboard/Watchlist';
import MovieList from './Screens/Dashboard/Admin/MovieList';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import Users from './Screens/Dashboard/Admin/Users';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';
import ScrollOnTop from './ScrollOnTop';
import Categories from './Screens/Dashboard/Admin/Categories';
import { getAllMoviesService, useMoviesListReducer } from './Api/Movies/AllMovies';
import { getAllMoviesAction } from './Api/MoviesActions';
import { UserContext, UserProvider } from './Context/Context';
import { getFavoriteMoviesAction } from './Api/UserActions';
import { useUserFavoriteMoviesReducer } from './Api/User/FavoriteMovies';
function App() {
  Aos.init();
  // const [categoriesState, categoriesDispatch] = useGetAllCategoriesReducer()
  // const [moviesState, moviesDispatch] = useMoviesListReducer()
  const [favoritesState, favoriteDispatch] = useUserFavoriteMoviesReducer()
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    Aos.init();
    if (userInfoFromStorage) {
      getFavoriteMoviesAction(favoriteDispatch, userInfoFromStorage);
    }
    // getAllMoviesAction({}, 1, moviesDispatch)
  },[favoriteDispatch, userInfoFromStorage]);

  return (
    <UserProvider>
      <ScrollOnTop>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/movies' element={<MoviesPage />}/>
        <Route path="/movies/:search" element={<MoviesPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path='/movie/:id' element={<SingleMovie />}/>
        <Route path='/watch/:id' element={<WatchPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/password' element={<Password />}/>
        <Route path='/favorites' element={<FavoritesMovies />}/>
        <Route path='/ignore' element={<IgnoredMovies />}/>
        <Route path='/watchlist' element={<WatchList />}/>
        <Route path='/movielist' element={<MovieList />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/users' element={<Users />}/>
        <Route path='/addmovie' element={<AddMovie />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </ScrollOnTop>

    </UserProvider>
  
    
  );
}

export default App;
