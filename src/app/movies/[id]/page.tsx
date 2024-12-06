"use client";
import { fetchMovies } from "@/app/utils/apt";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cast from "./cast";
import Trailer from "./trailer";
import { FaHeart, FaPlayCircle } from "react-icons/fa";
import { MdOutlineBookmarkAdded, MdOutlineFileDownload } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import Loading from "@/components/Loading";

type Movie = {
    backdrop_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    genres: { id: number; name: string }[];
    poster_path: string;
    original_title: string;
    popularity: number;
    vote_count: number;
    adult: boolean;
    id: number;
    video: boolean;
    original_language: string;
    original_name: string;
    status: string;
    type: string;
    homepage: string;
    in_production: boolean;
    production_companies: { id: number; name: string }[];
    production_countries: { iso_3166_1: string; name: string }[];
    spoken_languages: { iso_639_1: string; name: string }[];
    budget: number;
    revenue: number;
};

const page = () => {
    const [movieData, setMovieData] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        const fetchMovie = async () => {
            const data = await fetchMovies(`/movie/${id}`);
            setMovieData(data);
            setIsLoading(!isLoading);
        };
        fetchMovie();
    }, []);
    console.log(movieData);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <div
                        className="box w-full h-[80vh] mb-10 relative flex items-end"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movieData?.backdrop_path})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="box_child mx-auto container  bottom-0">
                            <h2 className="mb-5">
                                {movieData?.original_title}
                            </h2>
                            <div className="flex items-center gap-5 mb-10">
                                <p className="p-3 border rounded-[36px] border-white border-solid">
                                    CBFC:U/A
                                </p>
                                <p className="p-3 border rounded-[36px] border-white border-solid">
                                    {movieData?.vote_average} / 10
                                </p>
                                <p>{movieData?.release_date}</p>
                            </div>
                            <div className="pb-10 flex items-center justify-between ">
                                <div className="flex items-center gap-7">
                                    <button className="flex items-center gap-3 bg-white py-4 px-8 rounded-[40px]">
                                        <FaPlayCircle
                                            width={20}
                                            hanging={20}
                                            color="#111111"
                                        />
                                        <span className="text-black ">
                                            Watch Now
                                        </span>
                                    </button>
                                    <button className="btn flex items-center gap-3 bg-[#111111]  py-4 px-8 rounded-[40px]">
                                        <MdOutlineBookmarkAdded
                                            width={20}
                                            hanging={20}
                                            color="#fff"
                                        />
                                        <span className="text-white ">
                                            Add Watchlist
                                        </span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="btn  bg-[#111111]  py-4 px-4 rounded-[50%]">
                                        <FaHeart />
                                    </button>
                                    <button className=" btn bg-[#111111]  py-4 px-4 rounded-[50%]">
                                        <MdOutlineFileDownload />
                                    </button>
                                    <button className="btn  bg-[#111111]  py-4 px-4 rounded-[50%]">
                                        <IoMdShareAlt />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto">
                        <p className="mb-20">{movieData?.overview}</p>

                        {typeof id === "string" && <Cast id={id} />}
                        {typeof id === "string" && <Trailer id={id} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;
