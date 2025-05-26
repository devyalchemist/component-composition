import React, { useState } from "react";
import "../../textexpander.css";

function TextCollapse() {
	return (
		<div>
			<TextExpander
				className={"box"}
				collapsedNumWords={20}
				expandButtonText="Show text"
				collapseButtonText="Collapse text"
				buttonColor="#ff6622">
				Space travel is the ultimate adventure! Imagine soaring past the stars
				and exploring new worlds. It's the stuff of dreams and science fiction,
				but believe it or not, space travel is a real thing. Humans and robots
				are constantly venturing out into the cosmos to uncover its secrets and
				push the boundaries of what's possible.
			</TextExpander>

			<TextExpander
				className={"box"}
				collapsedNumWords={20}
				expandButtonText="Show text"
				collapseButtonText="Collapse text"
				buttonColor="#ff6622">
				Space travel requires some seriously amazing technology and
				collaboration between countries, private companies, and international
				space organizations. And while it's not always easy (or cheap), the
				results are out of this world. Think about the first time humans stepped
				foot on the moon or when rovers were sent to roam around on Mars.
			</TextExpander>

			<TextExpander
				className="box"
				collapsedNumWords={10}
				expandButtonText="Full text"
				collapseButtonText="Collapse text"
				buttonColor="#ff6622">
				Space missions have given us incredible insights into our universe and
				have inspired future generations to keep reaching for the stars. Space
				travel is a pretty cool thing to think about. Who knows what we'll
				discover next!
			</TextExpander>
		</div>
	);
}
function TextExpander({
	children,
	className,
	collapsedNumWords,
	expandButtonText,
	collapseButtonText,
	color = "red",
}) {
	const [expanded, setExpanded] = useState(true);
	// const [shortened, setShortened] = useState("");
	const buttonStyle = {
		color: color,
		cursor: "pointer",
	};
	const wordArr = children.trim().split(/\s+/);
	const shortenedText =
		wordArr.slice(0, collapsedNumWords).join(" ") +
		(wordArr.length > collapsedNumWords ? "..." : "");
	const displayText = expanded ? children : shortenedText;

	function handleClick() {
		setExpanded((prev) => !prev);

		// setShortened(expanded ? shortenedText : "");
	}
	return (
		<div className={className}>
			{displayText}

			<p style={buttonStyle} onClick={handleClick}>
				{expanded ? collapseButtonText : expandButtonText}
			</p>
		</div>
	);
}
export default TextCollapse;
