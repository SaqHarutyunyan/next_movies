import { fetchMovies } from "@/app/utils/apt";
import Loading from "@/components/Loading";
import SwiperSlider from "@/components/SwiperSlider";
import React, { useEffect, useState } from "react";
import { FaHeart, FaPlayCircle } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { MdOutlineBookmarkAdded, MdOutlineFileDownload } from "react-icons/md";

type history = {
    id: number;
    original_title: string;
    vote_average: number;
    overview: string;
    release_date: string;
    backdrop_path: string;
};

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [popularMovies, setPopularMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [commediMovies, setCommediMovies] = useState([]);
    const [historyMovies, setHistoryMovies] = useState<history[]>([]);
    useEffect(() => {
        const fetchAllMovies = async () => {
            // Popular movies
            const popularData = await fetchMovies("/movie/popular");
            setPopularMovies(popularData.results);

            // Action movies
            const actionData = await fetchMovies("/discover/movie", 28);
            setActionMovies(actionData.results);
            // Comedy movies
            const comedyMovies = await fetchMovies("/discover/movie", 35);
            setCommediMovies(comedyMovies.results);

            // History movies
            const historyData = await fetchMovies("/discover/movie", 36);
            setHistoryMovies(historyData.results);
            setIsLoading(false);
        };
        fetchAllMovies();
    }, []);
    console.log(popularMovies);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className=" mx-auto px-4 pb-6">
                    <div
                        className="box w-full h-[80vh] mb-10 relative flex items-end"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${historyMovies[0]?.backdrop_path})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="box_child mx-auto container  bottom-0">
                            <h2 className="mb-5">
                                {historyMovies[0]?.original_title}
                            </h2>
                            <div className="flex items-center gap-5 mb-10">
                                <p className="p-3 border rounded-[36px] border-white border-solid">
                                    CBFC:U/A
                                </p>
                                <p className="p-3 border rounded-[36px] border-white border-solid">
                                    {historyMovies[0]?.vote_average} / 10
                                </p>
                                <p>{historyMovies[0]?.release_date}</p>
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
                                    <button className="flex items-center gap-3 bg-[#111111]  py-4 px-8 rounded-[40px]">
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
                                    <button className="  bg-[#111111]  py-4 px-4 rounded-[50%]">
                                        <FaHeart />
                                    </button>
                                    <button className="  bg-[#111111]  py-4 px-4 rounded-[50%]">
                                        <MdOutlineFileDownload />
                                    </button>
                                    <button className="  bg-[#111111]  py-4 px-4 rounded-[50%]">
                                        <IoMdShareAlt />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-6">
                        Popular Movies
                    </h1>
                    {popularMovies.length > 0 ? (
                        <SwiperSlider movies={popularMovies} />
                    ) : (
                        <p className="text-white">Loading movies...</p>
                    )}
                    <h1 className="text-4xl font-bold text-white mt-10 mb-6">
                        Action Movies
                    </h1>
                    {actionMovies?.length > 0 ? (
                        <SwiperSlider movies={actionMovies} />
                    ) : (
                        <p className="text-white">Loading action movies...</p>
                    )}
                    <h1 className="text-4xl font-bold text-white mt-10 mb-6">
                        Commedy Movies
                    </h1>
                    {commediMovies?.length > 0 ? (
                        <SwiperSlider movies={commediMovies} />
                    ) : (
                        <p className="text-white">Loading action movies...</p>
                    )}
                    <h1 className="text-4xl font-bold text-white mt-10 mb-6">
                        History Movies
                    </h1>
                    {historyMovies?.length > 0 ? (
                        <SwiperSlider movies={historyMovies} />
                    ) : (
                        <p className="text-white">Loading action movies...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
