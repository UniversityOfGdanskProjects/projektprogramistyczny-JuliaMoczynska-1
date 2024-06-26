import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Banner from "../Components/Home/Banner";
import TopRated from "../Components/Home/TopRated";
import Layout from "../Layout/Layout";
import { useGetPopularMovies } from "../Api/Movies/PopularMovies";
import { useGetRandomMovies } from "../Api/Movies/RandomMovies";
import { getPopularAction, getRandomAction } from "../Api/Actions/MoviesActions";

function HomeScreen() {
  const [popularState, popularDispatch] = useGetPopularMovies();
  const [randomState, randomDispatch] = useGetRandomMovies();
  const { isLoading, isError, movies } = popularState;
  const { isError: isErrorRandom } = randomState;
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (!initialLoad) {
      getPopularAction(popularDispatch);
      getRandomAction(randomDispatch)
      setInitialLoad(true);
    }

    if (isError || isErrorRandom ) {
      toast.error("Something went wrong!");
      setInitialLoad(true);
    }
  }, [popularDispatch, randomDispatch, isError, isErrorRandom, initialLoad]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <TopRated movies={movies} isLoading={isLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
