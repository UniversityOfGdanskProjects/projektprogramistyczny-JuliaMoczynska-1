import React, { useState } from "react";
import { MdRateReview } from "react-icons/md";
import Titles from "../Titles";
import { Message, Select } from "../UsedInputs";
import Rating from "../Stars";

function MovieRates({movie}) {
    const Ratings = [
        {
            title:"0 - Poor",
            value: 0
        },
        {
            title:"1 - Fair",
            value: 1
        },
        {
            title:"2 - Good",
            value: 2
        },
        {
            title:"3 - Very Good",
            value: 3
        },
        {
            title:"4 - Exellent",
            value: 4
        },
        {
            title:"5 - Masterpiece",
            value: 5
        }
    ]

    const [rating, setRating] = useState(0);

    return(
        <div className="my-12">
            < Titles title="Reviews" Icon={MdRateReview}/>
            <div className="mt-10 xl:grid flex-col grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
                {/* {write review} */}
                <div className="xl:col-span-2 w-full flex flex-col gap-8">
                    <h3 className="text-xl text-text font-semibold">Review "{movie?.name}"</h3>
                    <p className="text-sm leading-7 font-medium text-border">
                        Write a rewiev for this movie. It will be posted on this page.
                    </p>
                    <div className="text-sm w-full">
                        <Select label="Select Rating" options={Ratings} onChange={(e) => setRating(e.target.value)}/>
                        <div className="flex mt-4 text-lg gap-2 text-star">
                            <Rating value={rating} />
                        </div>
                    </div>
                    {/* {message} */}
                    <Message label="Message" placeholder="Make your comment..."/>
                    {/* {submit} */}
                    <button className="bg-subMain text-white py-3 w-full flex-colo rounded"> Submit </button>
                </div>

            </div>
        </div>
    )
}

export default MovieRates