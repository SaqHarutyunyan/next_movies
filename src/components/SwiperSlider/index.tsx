import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
};

type SwiperSliderProps = {
    movies: Movie[];
};

const SwiperSlider: React.FC<SwiperSliderProps> = ({ movies }) => {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
            }}
        >
            {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                    <Link href={"movies/" + movie.id}>
                        <div className="movie_cont rounded-md relative overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                alt={movie.title}
                                className="w-full h-auto"
                            />
                            <div className="movie_item absolute w-full h-full flex top-0 flex-col justify-center items-center gap-1 bg-[#1111119d] z-10">
                                <FaCirclePlay
                                    color="white"
                                    width={40}
                                    height={40}
                                />
                                <h3 className="text-white text-center mt-2">
                                    {movie.title}
                                </h3>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperSlider;
