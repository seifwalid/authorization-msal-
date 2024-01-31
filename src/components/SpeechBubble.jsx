import "./SpeechBubble.css";

export default function SpeechBubble(props) {
	return <div className={"speech-bubble"}>{props.children}</div>;
}
