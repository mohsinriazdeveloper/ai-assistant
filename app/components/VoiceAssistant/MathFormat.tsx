import React, { FC } from "react";
import { InlineMath, BlockMath } from "react-katex";

// Utility function to split text and math parts
const parseMathInText = (text: string) => {
  // Updated regex to handle inline/block math expressions, Markdown headings, and custom patterns
  const parts = text.split(
    /(\$\$[^$]*\$\$|\$[^$]*\$|\\\[.*?\\\]|\\\(.*?\\\)|\*\*[^*]*\*\*|\*\s\*[^*]*\*\s\*|###.*?|\/*\[.*?\]\/\*)/gs
  );

  return parts.map((part, index) => {
    if (part.startsWith("###")) {
      // Render Markdown heading (remove the ### and trim)
      return <h3 key={index}>{part.slice(3).trim()}</h3>;
    } else if (part.startsWith("\\[") && part.endsWith("\\]")) {
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
      // Render bold text (remove the enclosing ** **)
      return <strong key={index}>{part.slice(2, -2).trim()}</strong>;
    } else if (part.startsWith("*") && part.endsWith("*")) {
      // Render italic text (remove the enclosing * *)
      return <em key={index}>{part.slice(1, -1).trim()}</em>;
    } else {
      // Render regular text
      return <span key={index}>{part}</span>;
    }
  });
};

const MathTextParser: FC<{ content: string }> = ({ content }) => {
  return <>{parseMathInText(content)}</>;
};

export default MathTextParser;
