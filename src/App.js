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

const tempMovieData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
	},
	{
		imdbID: "tt0133093",
		Title: "The Matrix",
		Year: "1999",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
	},
	{
		imdbID: "tt6751668",
		Title: "Parasite",
		Year: "2019",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
	},
];

const tempWatchedData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: "tt0088763",
		Title: "Back to the Future",
		Year: "1985",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

export const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(2);

export const KEY = "9cfc438f";

export default function App() {
	const [query, setQuery] = useState("");

	const [movies, setMovies] = useState(tempMovieData);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedId, setSelectedId] = useState("tt1375666");
	// const [userRating, setUserRating] = useState("");

	// const tempQuery = "interstellar";

	function handleShowMovie(id) {
		setSelectedId(id === selectedId ? null : id);
	}
	function handleRemoveMovie() {
		setSelectedId(null);
	}
	function handleDeleteWatchedMovie(id) {
		// setWatched(prev => {
		// 	const watched = [...prev];
		// 	const
		// 	const newWatched = watched.splice()
		// })
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
		}
	}

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
						`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
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
		fetchMovies();
		return function () {
			controller.abort();
		};
	}, [query]);

	return (
		<>
			<NavBar>
				<Logo />
				<SearchBar query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
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
							// setUserRating={setUserRating}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							{/* <WatchedSummary watched={watched} userRating={userRating} /> */}

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
