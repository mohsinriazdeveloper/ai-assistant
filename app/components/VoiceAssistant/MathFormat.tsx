import React, { FC } from "react";
import { InlineMath, BlockMath } from "react-katex";

// Utility function to split text and math parts
const parseMathInText = (text: string) => {
  // Regex to split text by inline/block math expressions or text wrapped in `**`
  const parts = text.split(
    /(\\\[.*?\\\]|\\\(.*?\\\)|\$\$.*?\$\$|\$.*?\$|\*\*[^*]*\*\*)/g
  );

  return parts.map((part, index) => {
    if (part.startsWith("\\[") && part.endsWith("\\]")) {
      // Render block math (remove the enclosing \[ \])
      return <BlockMath key={index} math={part.slice(2, -2).trim()} />;
    } else if (part.startsWith("\\(") && part.endsWith("\\)")) {
      // Render inline math (remove the enclosing \( \))
      return <InlineMath key={index} math={part.slice(2, -2).trim()} />;
    } else if (part.startsWith("$$") && part.endsWith("$$")) {
      // Render block math (remove the enclosing $$ $$)
      return <BlockMath key={index} math={part.slice(2, -2).trim()} />;
    } else if (part.startsWith("$") && part.endsWith("$")) {
      // Render inline math (remove the enclosing $ $)
      return <InlineMath key={index} math={part.slice(1, -1).trim()} />;
    } else if (part.startsWith("**") && part.endsWith("**")) {
      // Render bold text (remove the enclosing **)
      return <strong key={index}>{part.slice(2, -2).trim()}</strong>;
    } else {
      // Render normal text
      return <span key={index}>{part}</span>;
    }
  });
};

// Example Component
const ContentWithMath: FC<{ content: string }> = ({ content }) => {
  return <div>{parseMathInText(content)}</div>;
};

interface MathFormatProps {
  content: string;
}

const MathFormat: FC<MathFormatProps> = ({ content }) => {
  return (
    <div className="whitespace-pre-wrap">
      <ContentWithMath content={content} />
    </div>
  );
};

export default MathFormat;
