import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import WatchedMovieList from "./WatchedMovieList";
import Box from "./Box";
import MovieDetail from "./MovieDetail";
import WatchedSummary from "./WatchedSummary";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import SearchBar from "./SearchBar";
import Main from "./Main";
import NavBar from "./NavBar";
import NumResults from "./NumResults";
import Logo from "./Logo";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(2);

export const KEY = "9cfc438f";

export default function App() {
	const [query, setQuery] = useState("");

	const { movies, isLoading, error } = useMovies(query);
	const [selectedId, setSelectedId] = useState("");
	const [watched, setWatched] = useLocalStorageState([], "watched");

	// My trial is below
	// const [watched, setWatched] = useLocalStorageState(() => {
	// 	const storedValue = localStorage.getItem("watched");
	// 	return JSON.parse(storedValue);
	// });
	// const [watched, setWatched] = useState(() => {
	// 	const storedValue = localStorage.getItem("watched");
	// 	return JSON.parse(storedValue);
	// });

	function handleShowMovie(id) {
		setSelectedId(id === selectedId ? null : id);
	}
	function handleRemoveMovie() {
		setSelectedId(null);
	}
	function handleDeleteWatchedMovie(id) {
		setWatched((prev) => prev.filter((item) => item.imdbID !== id));
	}
	function handleAddWatched(movie) {
		const exist = watched.some((e) => e.imdbID === movie.imdbID);
		if (exist) {
			setWatched((prev) =>
				prev.map((item) =>
					item.imdbID === movie.imdbID
						? { ...item, userRating: movie.userRating }
						: item
				)
			);
		} else {
			setWatched((watched) => [...watched, movie]);
			// localStorage.setItem("watched", JSON.stringify([...watched, movie]));
		}
	}

	// useEffect(() => {
	// 	localStorage.setItem("watched", JSON.stringify(watched));
	// }, [watched]);

	return (
		<>
			<NavBar>
				<Logo />
				<SearchBar query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{isLoading && !error && <Loader />}
					{!isLoading && !error && (
						<MovieList onShowMovie={handleShowMovie} movies={movies} />
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetail
							onAddWatchedMovie={handleAddWatched}
							onRemoveMovie={handleRemoveMovie}
							movieId={selectedId}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />

							<WatchedMovieList
								watched={watched}
								onDeleteWatched={handleDeleteWatchedMovie}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
