import { useEffect, useRef, useState } from "react";

const useStreamingText = (text: string, speed: number = 30) => {
  const [streamedText, setStreamedText] = useState("");
  const textRef = useRef(text);
  const streamedTextRef = useRef(streamedText);

  useEffect(() => {
    textRef.current = text;
    setStreamedText(""); // Reset when text changes
    streamedTextRef.current = "";
  }, [text]);

  useEffect(() => {
    let i = 0;
    let timeoutId: NodeJS.Timeout;

    const streamCharacter = () => {
      if (i < textRef.current.length) {
        const nextChar = textRef.current.charAt(i);
        streamedTextRef.current += nextChar;
        setStreamedText(streamedTextRef.current);
        i++;
        timeoutId = setTimeout(streamCharacter, speed);
      }
    };

    // Start streaming
    timeoutId = setTimeout(streamCharacter, speed);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, speed]);

  return streamedText;
};

export default useStreamingText;
