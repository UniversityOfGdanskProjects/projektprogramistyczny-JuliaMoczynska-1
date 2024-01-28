import React, { useCallback, useEffect, useMemo, useState } from "react";
import Filters from "../Components/Filters";
import Layout from "../Layout/Layout";
import Movie from "../Components/Movie";
import toast from "react-hot-toast";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import Loader from "../Components/Notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import {
  CategoriesData,
  LanguageData,
  RatesData,
  TimesData,
  YearData,
} from "../Data/FilterData";
import { useParams } from "react-router-dom";
import { ErrorsAction } from "../Protection";
import { getAllMoviesService, useMoviesListReducer } from "../Api/Movies/AllMovies";


function MoviesPage() {
  const { search } = useParams();
  const [category, setCategory] = useState(CategoriesData[0]);
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);
  const [moviesState, moviesDispatch] = useMoviesListReducer();

  const sameClass =
    "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain";

  const { isLoading, isError, movies, pages, page } = moviesState

  const queries = useMemo(() => {
    const query = {
        category: category?.title === "All Categories" ? "" : (category?.title || ""),
        time: times?.title?.replace(/\D/g, "") || "",
        language: language?.title === "Sort By Language" ? "" : (language?.title || ""),
        rate: rates?.title?.replace(/\D/g, "") || "",
        year: year?.title?.replace(/\D/g, "") || "",
        search: search || "",
    };
    return query;
  }, [category, times, language, rates, year, search]);

  const getAllMoviesAction = useCallback(
    async (page) => {
      try {
        moviesDispatch({ type: "MOVIES_LIST_REQUEST" });
        const response = await getAllMoviesService(
          queries.category,
          queries.time,
          queries.language,
          queries.rate,
          queries.year,
          queries.search,
          page
        );

        moviesDispatch({
          type: "MOVIES_LIST_SUCCESS",
          payload: response,
        });
        
      } catch (error) {
        ErrorsAction(error, moviesDispatch, "MOVIES_LIST_FAIL");
      }
    },
    [queries, moviesDispatch]
  );

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    getAllMoviesAction(page);
  }, [getAllMoviesAction, isError, queries, page]);

  const nextPage = () => {
    getAllMoviesAction( page + 1)

  };
  const prevPage = () => {
    getAllMoviesAction( page - 1)
  };

  const datas = {
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={datas} />
        <p className="text-lg font-medium my-6">
          <span className="font-bold text-subMain">
            {movies ? movies?.length : 0}
          </span>{" "}
          items Found on this page {search && `for "${search}"`}
        </p>
        {isLoading ? (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {movies.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>
            {/* Loading More */}
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className={sameClass}
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                onClick={nextPage}
                disabled={page === pages}
                className={sameClass}
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              It seem's like we dont have any movie
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MoviesPage;
