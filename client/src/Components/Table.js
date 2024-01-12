import React from "react";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Rows = (movie, i, onDeleteHandler, admin) => {
    return (
        <tr key={i} className="transition-all hover:bg-gray-800">
            <td className="text-center">
                <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src={movie?.image ? movie?.image : "/images/user.png"}
                    alt={movie?.name}
                />
                </div>
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
            {admin ? (
                <>
                    <Link
                        to={`/edit/${movie?._id}`}
                        className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2"
                        >
                        Edit <FaEdit className="text-green-500" />
                    </Link>
                    <button
                    onClick={() => onDeleteHandler(movie?._id)}
                    className="bg-subMain text-white rounded flex-colo w-6 h-6"
                    >
                        <MdDelete />
                    </button>
                </>
            ) : (
                <>
                    <div className="pt-2">
                        <Link to={`/movie/${movie?.name}`} className="bg-dryGray hover:bg-green-500 ml-3 text-main rounded flex-colo w-6 h-6">
                            <IoEye />
                        </Link>
                    </div>
                    
                </>
            )}
        </tr>
    );
};

function Table({ data, admin, onDeleteHandler}) {
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
                    {data.map((movie, i) => Rows(movie, i, onDeleteHandler, admin))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
