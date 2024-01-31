import "./SpeechBubble.css";

export default function SpeechBubble(props) {
	return (
		<div className={"speech-bubble"}>
			<button className="hide-bubble-btn" onClick={() => props.hideBubble()}>
				✖
			</button>
			{props.children}
		</div>
	);
}
