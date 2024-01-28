import React, {  useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import MovieCasts from '../Components/Single/MovieCasts';
import MovieInfo from '../Components/Single/MovieInfo';
import MovieRates from '../Components/Single/MovieRates';
import Layout from '../Layout/Layout';
import { getMovieByIdAction } from '../Api/Actions/MoviesActions';
import Loader from '../Components/Notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { useGetMovieDetailsReducer } from '../Api/Movies/ByIdMovie';


function SingleMovie() {
  const { id } = useParams();
  const sameClass = 'w-full gap-6 flex-colo min-h-screen';
  const [movieDetailsState, movieDetailsDispatch] = useGetMovieDetailsReducer();
  const { isLoading, isError, movie } = movieDetailsState;

  useEffect(() => {
    // Pobieranie informacji o filmie
    getMovieByIdAction(id, movieDetailsDispatch);

  }, [id, movieDetailsDispatch]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <>
          <MovieInfo movie={movie} />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            <MovieRates movie={movie} />
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
