import clippy_img from "../assets/clippy.png";
import SpeechBubble from "./SpeechBubble";
import "./Clippy.css";
import { useState } from "react";

export default function Clippy() {
	const [hidden, setHidden] = useState(false);

	const hideClippy = () => {
		setHidden(true);
	};

	return (
		<div className="clippy-container">
			<div className={`clippy ${hidden ? "hidden" : ""}`}>
				<SpeechBubble hideBubble={() => hideClippy()}>
					What am I supposed to write here, Seif? Am I supposed to write about
					this app&apos;s functionality? or what exactly. please help.
				</SpeechBubble>
				<img src={clippy_img} alt="" />
			</div>
		</div>
	);
}
