import React, { useEffect, useState } from "react";
import "./currencyconverter.css";
import Loader from "../../Loader";

function ConverterForm() {
	const [query, setQuery] = useState("");
	const [baseCurrency, setBaseCurrency] = useState("USD");
	const [quoteCurrency, setQuoteCurrency] = useState("EUR");
	const [loaded, setLoaded] = useState(true);

	const [output, setOutput] = useState("");

	useEffect(() => {
		const connection = new AbortController();

		async function convert() {
			try {
				setLoaded(false);
				if (query.length < 1) {
					return null;
				} else if (baseCurrency === quoteCurrency) {
					setOutput(query);
				} else {
					const res = await fetch(
						`https://api.frankfurter.app/latest?amount=${query}&from=${baseCurrency}&to=${quoteCurrency}`,
						{ signal: connection.signal }
					);
					if (res.ok) {
						setLoaded(true);
					}
					const data = await res.json();
					console.log(data);
					setOutput(data.rates[quoteCurrency]);
				}
			} catch (err) {
				if (err.code) console.log(err);
			} finally {
				setLoaded(true);
			}
		}
		convert();
		return function () {
			connection.abort();
			setOutput("");
			// setLoaded(true);
		};
	}, [query, baseCurrency, quoteCurrency]);
	return (
		<>
			{/* `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD` */}

			<div className="main">
				<h2>Currency Converter</h2>
				<div className="converter-form">
					<div className="container">
						<input
							type="number"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<div className="selections">
							<select
								value={baseCurrency}
								onChange={(e) => setBaseCurrency(e.target.value)}>
								<option value="USD">USD</option>
								<option value="EUR">EUR</option>
								<option value="CAD">CAD</option>
								<option value="INR">INR</option>
							</select>
							<select
								value={quoteCurrency}
								onChange={(e) => setQuoteCurrency(e.target.value)}>
								<option value="USD">USD</option>
								<option value="EUR">EUR</option>
								<option value="CAD">CAD</option>
								<option value="INR">INR</option>
							</select>
						</div>
					</div>
					<div className="con">
						{/* {loaded ? "Input a value" : null} */}
						{loaded ? (
							<p className="output">
								{output === "" ? "Start typing" : output}
							</p>
						) : (
							<Loader />
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default ConverterForm;
