import { useEffect } from "react";
export function useKey(code, handleFunc) {
	// const [code, setCode] = useState(code);
	useEffect(() => {
		function callback(e) {
			if (e.code.toLowerCase() === code.toLowerCase()) {
				handleFunc();
				console.log("worked");
			}
		}
		document.addEventListener("keydown", callback);

		return function () {
			document.removeEventListener("keydown", callback);
		};
	}, [handleFunc, code]);
}
