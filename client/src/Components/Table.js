import React from "react";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";

const Rows = (movie, i, admin) => {
    return (
        <tr key={i} className="transition-all hover:bg-gray-800">
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
            {admin && (
                <td className=" flex flex-row px-6 py-4 text-sm leading-5 text-right">
                    {/* Przyciski akcji dla admina */}
            
                    <button className="text-subMain hover:text-main">Edit</button>
                    <button className="ml-2 text-red-500 hover:text-red-700">Delete</button>
                    <Link to={`/movie/${movie?.name}`} className="bg-dryGray hover:bg-green-500 ml-3 text-main rounded flex-colo w-6 h-6"><IoEye /></Link>
                </td>
            )}
            {!admin && (
                <td className="flex flex-row px-6 py-4 text-sm leading-5 text-right">
                    {/* Przycisk "Delete" dla nie-administratora */}
                    <button className="text-red-500 hover:text-red-700">Delete</button>
                    <Link to={`/movie/${movie?.name}`} className="bg-dryGray hover:bg-green-500 ml-3 text-main rounded flex-colo w-6 h-6"><IoEye /></Link>
                </td>
            )}
        </tr>
    );
};

function Table({ data, admin }) {
    const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
    return (
        <div className="overflow-x-scroll overflow-hidden relative w-full">
            <table className="w-full table-auto border border-border divide-y divide-border">
                <thead>
                    <tr className="bg-dryGray">
                        <th scope="col" className={`${Head}`}>
                            Image
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Name
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Category
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Language
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Year
                        </th>
                        <th scope="col" className={`${Head}`}>
                            Hours
                        </th>
                        <th scope="col" className={`${Head} text-end`}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-main divide-y divide-gray-800">
                    {data.map((movie, i) => Rows(movie, i, admin))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
