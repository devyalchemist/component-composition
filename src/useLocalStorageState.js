import { useState, useEffect } from "react";

// export function useLocalStorageState(value) {
// 	let [variable, setVariable] = useState(value);
// 	function setStateVariable(newValue) {
// 		setVariable(newValue);
// 	}

// 	return [variable, setStateVariable];
// }

export function useLocalStorageState(initialValue, key) {
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
}
