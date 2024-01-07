import React from "react";
import Layout from "../Layout/Layout";
import { Movies } from "../Data/MovieData";
import { useParams } from "react-router-dom";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import MovieInfo from "../Components/Single/MovieInfo";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieRates from "../Components/Single/MovieRates";
import Titles from "../Components/Titles";
import Movie from "../Components/Movie";

function SingleMovie() {
    const {id} = useParams()
    const movie = Movies.find((m) => (
        m.name === id
    ))
    const RelatedMovies = Movies.filter((m) => m.category === movie.category && m.name !== id)
    return(
        <Layout>
            <MovieInfo movie={movie}/>
            <div className="container mx-auto min-h-screen px-2 my-6">
                <MovieCasts />
                <MovieRates movie={movie}/>
                <div className="my-16">
                    <Titles title="Related Movies" Icon={BsFillCollectionPlayFill} />
                    <div className="grid sm:mt-10 mt-6 x1:grid-cols-4 2x1:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                        {RelatedMovies?.map((movie, index) => (
                            <Movie key={index} movie={movie} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SingleMovie