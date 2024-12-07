"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { fetchMovies } from "../utils/apt";
import { FaCirclePlay } from "react-icons/fa6";
import Link from "next/link";
import Loading from "@/components/Loading";

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string | null;
    vote_average: number | null;
    backdrop_path: string | null;
};

const page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearhText] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearhText(e.target.value);
    };
    console.log(movies);

    const handleSearch = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        if (!searchText.trim()) {
            alert("Please enter a search term.");
            return;
        }
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=9b702a6b89b0278738dab62417267c49&query=${searchText}`
            );
            const movies = await response.json();
            setMovies(movies.results);
            console.log("Fetched Movies:", movies); // Process or display these movies as needed
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
        setSearhText("");
        setIsLoading(false);
    };

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="container mx-auto pt-20 px-4">
                    <form
                        onSubmit={handleSearch}
                        className="mb-10 flex justify-center"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                className=" w-[400px] py-2 px-7 rounded-[20px] text-black"
                                placeholder="Search..."
                                value={searchText}
                                onChange={handleChange}
                            />
                            <CiSearch
                                className="absolute right-[10px] top-3"
                                color="black"
                            />
                        </div>
                        <button className="submit">Search</button>
                    </form>
                    <div className="grid grid-cols-3 gap-3">
                        {movies.length === 0 ? (
                            <p className="text-white">No movies found.</p>
                        ) : (
                            movies?.map((movie, id) => {
                                return (
                                    <Link
                                        href={"movies/" + movie.id}
                                        key={"movie" + id}
                                    >
                                        <div className="movie_cont rounded-md relative overflow-hidden bg-slate-300">
                                            <img
                                                src={
                                                    movie.backdrop_path
                                                        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                                                        : "/default-image.jpg"
                                                }
                                                alt={
                                                    movie.title ||
                                                    "No title available"
                                                }
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
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;
