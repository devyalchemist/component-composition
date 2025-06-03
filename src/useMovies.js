import { useEffect, useState } from "react";
import { KEY } from "./App";
export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	useEffect(() => {
		const controller = new AbortController();
		async function fetchMovies() {
			try {
				if (query.length < 3) {
					setMovies([]);
					setError("");
				} else {
					setIsLoading(true);
					setError("");
					const result = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
						{ signal: controller.signal }
					);
					if (!result.ok) throw new Error("Error occured while fetching data");
					const data = await result.json();
					if (data.Response === false) throw new Error("Movie not found!");
					setMovies(data.Search);
				}
				setError("");
			} catch (err) {
				if (err.name !== "AbortError") {
					setError(err.message);
				}
			} finally {
				setIsLoading(false);
			}
		}
		// callback();
		fetchMovies();
		return function () {
			controller.abort();
		};
	}, [query]);
	return { movies, isLoading, error };
}
