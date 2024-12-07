import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { fetchMovies } from "@/app/utils/apt";
import Image from "next/image";

type Actor = {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
};

type CastProps = {
    id: string;
};

const Cast = ({ id }: CastProps) => {
    const [actors, setActors] = useState<Actor[] | null>(null);

    useEffect(() => {
        const getActors = async () => {
            const data = await fetchMovies(`/movie/${id}/credits`);
            if (data && Array.isArray(data.cast)) {
                setActors(data.cast);
            }
        };
        getActors();
    }, [id]);
    console.log(actors);

    return (
        <div className="mb-20">
            <h2 className="text-2xl font-bold text-left mb-4">Top Cast</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {actors?.slice(0, 15)?.map((actor) => (
                    <SwiperSlide key={actor.id}>
                        <div className="flex items-center gap-3  rounded-md overflow-hidden">
                            {actor.profile_path && (
                                <img
                                    alt={actor.name}
                                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                    className="w-[58px] h-[58px] rounded-[50%] object-cover"
                                />
                            )}
                            <div>
                                <h3 className="text-white text-center mt-2">
                                    {actor.name}
                                </h3>
                                <h3 className="text-white text-center mt-2">
                                    {actor.character}
                                </h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Cast;
