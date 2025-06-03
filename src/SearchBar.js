import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export default function SearchBar({ query, setQuery }) {
	// useEffect(() => {
	// 	const inputSearch = document.querySelector(".search");
	// 	inputSearch.focus();
	// }, []);
	const inputElement = useRef(null);
	useKey("Enter", function () {
		if (document.activeElement === inputElement.current) return;

		inputElement.current.focus();
		setQuery("");
	});

	return (
		<>
			<input
				className="search"
				type="text"
				placeholder="Search movies..."
				value={query}
				ref={inputElement}
				onChange={(e) => setQuery(e.target.value)}
			/>
		</>
	);
}
