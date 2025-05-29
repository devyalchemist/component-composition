import { useState } from "react";
import { average } from "./App";

/* function WatchedBox() {
	const [watched, setWatched] = useState(tempWatchedData);
	const [isOpen2, setIsOpen2] = useState(true);

	return (
		<>
			{" "}
			<div className="box">
				<button
					className="btn-toggle"
					onClick={() => setIsOpen2((open) => !open)}>
					{isOpen2 ? "–" : "+"}
				</button>
				{isOpen2 && (
					<>
						<WatchedSummary watched={watched} />
						<WatchedMovieList watched={watched} />
					</>
				)}
			</div>
		</>
	);
} */
export default function Box({ children }) {
	const [isOpen, setIsOpen1] = useState(true);

	return (
		<>
			<div className="box">
				<button
					className="btn-toggle"
					onClick={() => setIsOpen1((open) => !open)}>
					{isOpen ? "–" : "+"}
				</button>
				{isOpen && children}
			</div>
		</>
	);
}

