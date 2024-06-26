import React from "react";
import { Movies } from "../../../Data/MovieData";
import SideBar from "../SideBar";
import { FaFilm, FaList, FaStar } from "react-icons/fa";
import { CategoriesData } from "../../../Data/FilterData";

function Dashboard() {
    const totalMovies = Movies.length;
    const totalCategories = CategoriesData.length;

    const topMovies = Movies.slice(0, 5);

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Information</h2>

                {/* Total Movies */}
                <div className="bg-main p-4 rounded">
                    <div className="flex items-center">
                        <FaFilm className="text-white mr-2" />
                        <h3 className="text-lg font-semibold text-white">Total Movies</h3>
                    </div>
                    <p className="text-white">{totalMovies}</p>
                </div>

                {/* Total Categories */}
                <div className="bg-main p-4 rounded">
                    <div className="flex items-center">
                        <FaList className="text-white mr-2" />
                        <h3 className="text-lg font-semibold text-white">Total Categories</h3>
                    </div>
                    <p className="text-white">{totalCategories}</p>
                </div>


                {/* Top Movies */}
                <div className="bg-main p-4 rounded">
                    <div className="flex mb-3 items-center">
                        <FaStar className="text-white mr-2" />
                        <h3 className="text-lg font-semibold text-white">Ranking - Top Popular Movies</h3>
                    </div>
                    <table className="w-full table-auto border border-border divide-y divide-border">
                        <thead>
                            <tr className="bg-dryGray">
                                <th scope="col" className="text-xs text-left text-main font-semibold px-6 py-2 uppercase">
                                    Image
                                </th>
                                <th scope="col" className="text-xs text-left text-main font-semibold px-6 py-2 uppercase">
                                    Name
                                </th>
                                <th scope="col" className="text-xs text-left text-main font-semibold px-6 py-2 uppercase">
                                    Category
                                </th>
                                <th scope="col" className="text-xs text-left text-main font-semibold px-6 py-2 uppercase">
                                    Language
                                </th>
                                <th scope="col" className="text-xs text-left text-main font-semibold px-6 py-2 uppercase">
                                    Year
                                </th>
                                <th scope="col" className="text-xs text-left text-main font-semibold px-6 py-2 uppercase">
                                    Hours
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-main divide-y divide-gray-800">
                            {topMovies.map((movie, index) => (
                                <tr key={index} className="transition-all hover:bg-gray-800">
                                    <td className="text-center">
                                        <img
                                            src={`/images/movies/${movie.titleImage}`}
                                            alt={movie?.name}
                                            className="w-8 h-8 object-cover mx-auto"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-left leading-5 font-medium text-white">
                                            {movie.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-left leading-5 text-white">
                                            {movie.category}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-left leading-5 text-white">
                                            {movie.language}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-left leading-5 text-white">
                                            {movie.year}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-left leading-5 text-white">
                                            {movie.time}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </SideBar>
    );
}

export default Dashboard;
