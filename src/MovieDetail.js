import StarRating from "./components/StarRating/StarRating";
import { useEffect, useState } from "react";
import { KEY } from "./App";
import Loader from "./Loader";
function MovieDetail({
	movieId,
	onRemoveMovie,
	onAddWatchedMovie,
	watched,
	// setUserRating,
}) {
	const [movieDetails, setMovieDetails] = useState({});
	const [userRating, setUserRating] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const isWatched = watched?.map((movie) => movie.imdbID).includes(movieId);
	// console.log(isWatched);
	const watchedUserRating = watched.find(
		(watched) => watched.imdbID === movieId
	)?.userRating;

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movieDetails;

	useEffect(() => {
		function callback(e) {
			if (e.code === "Escape") {
				onRemoveMovie();
				console.log("worked");
			}
		}
		document.addEventListener("keydown", callback);

		return function () {
			document.removeEventListener("keydown", callback);
		};
	}, [onRemoveMovie]);
	useEffect(
		function () {
			setMovieDetails({});

			async function getMovieDetails() {
				try {
					setIsLoading(true);
					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
					);
					if (!res.ok) throw new Error("Couldn't find movie data");
					const data = await res.json();
					// console.log(data);
					setMovieDetails(data);
					setIsLoading(false);
				} catch (err) {
					console.error(err.message);
				}
			}
			getMovieDetails();
		},
		[movieId]
	);

	useEffect(() => {
		// if (!title) {
		// 	document.title = `MOVIE`;
		// }
		// document.title = `MOVIE | ${title}`;
		document.title = `MOVIE | ${!title ? "" : title}`;
		return function () {
			document.title = `usePopcorn`;
		};
	}, [title]);
	function handleAdd() {
		const newWatchedMovie = {
			imdbID: movieId,
			imdbRating: Number(imdbRating),
			title,
			year,
			poster,
			userRating,
			runtime: Number(runtime.split(" ").at(0)),
		};
		onAddWatchedMovie(newWatchedMovie);
		onRemoveMovie();
	}
	return (
		<>
			<div className="details">
				{isLoading ? (
					<Loader />
				) : (
					<header>
						<button className="btn-back" onClick={onRemoveMovie}>
							&larr;
						</button>
						<div className="wrapper">
							<img src={poster} alt={`Poster of ${movieDetails} movie`} />
							<div className="details-overview">
								<h2>{title}</h2>
								<p>
									{released} &bull; {runtime}
								</p>
								<p>{genre}</p>
								<p>
									<span>⭐</span>
									{imdbRating} IMDb rating
								</p>
							</div>
						</div>
						<section>
							<div className="rating">
								{!isWatched ? (
									<>
										<StarRating
											maxRating={10}
											size={24}
											onSetRating={setUserRating}
										/>
										{userRating > 0 && (
											<button className="btn-add" onClick={handleAdd}>
												Add
											</button>
										)}
									</>
								) : (
									<p>
										You have rated this movie earlier with {watchedUserRating}{" "}
										<span>⭐</span>
									</p>
								)}
							</div>
							<p>
								<em>{plot}</em>
							</p>
							<p>Starring {actors}</p>
							<p>Directed by {director}</p>
						</section>
					</header>
				)}
			</div>
		</>
	);
}

export default MovieDetail;
