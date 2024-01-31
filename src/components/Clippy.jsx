import clippy_img from "../assets/clippy.png";
import SpeechBubble from "./SpeechBubble";
import "./Clippy.css";

export default function Clippy() {
	return (
		<div className="clippy-container">
			<div className="clippy">
				<SpeechBubble>
					What am I supposed to write here, Seif? Am I supposed to write about
					this app&apos;s functionality? or what exactly. please help.
				</SpeechBubble>
				<img src={clippy_img} alt="" />
			</div>
		</div>
	);
}
