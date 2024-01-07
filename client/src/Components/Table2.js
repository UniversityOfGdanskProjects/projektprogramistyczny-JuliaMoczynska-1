import React from "react";

const Rows2 = (user, i) => {
    return (
        <tr key={i} className="transition-all hover:bg-gray-800">
            <td className="px-6 py-4">
                <div className="text-sm text-left leading-5 font-medium text-white">
                    {user.id}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-left leading-5 text-white">
                    {user.joinDate}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-left leading-5 text-white">
                    {user.fullName}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-left leading-5 text-white">
                    {user.email}
                </div>
            </td>
            <td className="flex flex-row px-6 py-4 text-sm leading-5 text-right">
                <button className="ml-2 text-red-500 hover:text-red-700">Delete</button>
            </td>
        </tr>
    );
};

function Table2({ data, admin }) {
    const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";

    return (
        <div className="overflow-x-scroll overflow-hidden relative w-full">
            {admin ? (
                <table className="w-full table-auto border border-border divide-y divide-border">
                    <thead>
                        <tr className="bg-dryGray">
                            <th scope="col" className={`${Head}`}>
                                ID
                            </th>
                            <th scope="col" className={`${Head}`}>
                                Join Date
                            </th>
                            <th scope="col" className={`${Head}`}>
                                FullName
                            </th>
                            <th scope="col" className={`${Head}`}>
                                Email
                            </th>
                            <th scope="col" className={`${Head} text-end`}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-main divide-y divide-gray-800">
                        {data.map((user, i) => Rows2(user, i))}
                    </tbody>
                </table>
            ) : (  
                <div className="bg-red-500 text-white p-4 rounded flex ">
                    <p className="text-white text-semibold pl-3">You are not an admin. Cannot delete users.</p>
                </div>
            )}
        </div>
    );
}

export default Table2;
