import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Movies } from '../../Data/MovieData';
import { Link } from 'react-router-dom';
import FlexMovieItems from '../FlexMovieItems';
import { MdFavorite, MdAdd } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

function Banner() {
    return (
        <div className="relative w-full">
            <Swiper
                direction="vertical"
                slidesPerView={1}
                loop={true}
                speed={1000}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                className="w-full x1:h-96 bg-dry lg:h-64 h-48"
            >
                {Movies.map((movie, index) => (
                    <SwiperSlide key={index} className="relative rounded overflow-hidden">
                        <img src={`/images/movies/${movie.image}`} alt={movie.title} className="w-full h-full object-cover" />
                        <div className="absolute linear-bg x1:p1-52 sm:p1-32 pl-12 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
                            <h1 style={{ fontSize: '24px' }} className="x1:text-4x1 truncate capitalize font-sans sm:text-2x1 text-x1 font-bold">
                                {movie.name}
                            </h1>
                            <div className="flex gap-5 items-center text-dryGray">
                                <FlexMovieItems movie={movie} />
                            </div>
                            <div className="flex gap-5 items-center ">
                                <Link to={`/movie/${movie.name}`}
                                className="bg-subMain hover:text-main transitions text-white p-2 rounded">
                                Watch trailer
                                </Link>
                                <div>
                                    <button className="bg-[rgba(0, 0, 0, 0.5)] hover:text-subMain transitions text-white p-2 rounded">
                                        <MdFavorite/>
                                    </button>
                                    <button className="bg-[rgba(0, 0, 0, 0.5)] hover:text-subMain transitions text-white p-2 rounded">
                                        <MdAdd />
                                    </button>
                                    <button className="bg-[rgba(0, 0, 0, 0.5)] hover:text-subMain transitions text-white p-2 rounded">
                                        <AiFillDelete />
                                    </button>
                                </div>
                            
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Banner;
