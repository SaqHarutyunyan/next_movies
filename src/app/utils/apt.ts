export const fetchMovies = async (endpoint: string, genreId?: number) => {
    const apiKey = "9b702a6b89b0278738dab62417267c49";
    let url = `https://api.themoviedb.org/3${endpoint}?api_key=${apiKey}`;

    if (genreId) {
        url += `&with_genres=${genreId}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching movies:", error);
        return null;
    }
};
