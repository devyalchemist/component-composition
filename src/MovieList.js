import Movie from "./Movie";

export default function MovieList({ movies, onShowMovie }) {
	return (
		<>
			<ul className="list list-movies">
				{movies?.map((movie, i) => (
					<Movie onShowMovie={onShowMovie} key={movie.imdbID} movie={movie} />
				))}
			</ul>
		</>
	);
}
