import { useEffect, useRef } from "react";
import useStreamingText from "../../hooks/useStreamingText";

interface StreamingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  renderText?: (text: string) => React.ReactNode;
}

const StreamingText = ({
  text,
  speed = 30,
  className = "",
  onComplete,
  renderText = (text) => <span>{text}</span>,
}: StreamingTextProps) => {
  const streamedText = useStreamingText(text, speed);
  const prevTextLengthRef = useRef(0);

  useEffect(() => {
    if (
      streamedText.length === text.length &&
      streamedText.length > 0 &&
      streamedText.length !== prevTextLengthRef.current
    ) {
      prevTextLengthRef.current = streamedText.length;
      if (onComplete) onComplete();
    }
  }, [streamedText, text, onComplete]);

  return (
    <div className={className}>
      {renderText(streamedText)}
      {/* {streamedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )} */}
    </div>
  );
};

export default StreamingText;
