import React, { useEffect, useState } from "react";
import { fetchMovies } from "@/app/utils/apt";

type TrailerProps = {
    id: string;
};

const Trailer = ({ id }: TrailerProps) => {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    useEffect(() => {
        const getTrailer = async () => {
            const data = await fetchMovies(`/movie/${id}/videos`);
            const trailer = data.results.find(
                (video: any) => video.type === "Trailer"
            );
            if (trailer) {
                setTrailerKey(trailer.key);
            }
        };
        getTrailer();
    }, [id]);

    return (
        <div className="my-4 ">
            {trailerKey ? (
                <iframe
                    className="rounded-3xl"
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <p>No trailer available</p>
            )}
        </div>
    );
};

export default Trailer;
