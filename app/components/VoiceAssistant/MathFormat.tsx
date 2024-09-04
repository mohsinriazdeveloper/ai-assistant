import React, { FC } from "react";
import { InlineMath, BlockMath } from "react-katex";

// Utility function to split text and math parts
const parseMathInText = (text: string) => {
  // Updated regex to handle inline/block math expressions, Markdown, and custom patterns
  const parts = text.split(
    /(\$\$[^$]*\$\$|\$[^$]*\$|\\\[.*?\\\]|\\\(.*?\\\)|\*\*[^*]*\*\*|###.*|\/\[.*?\/\])/gs
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
    } else if (part.match(/^\*\*.*\*\*$/)) {
      // Render bold text (remove the enclosing **)
      return <strong key={index}>{part.slice(2, -2).trim()}</strong>;
    } else if (part.startsWith("/[") && part.endsWith("/]")) {
      // Handle preformatted text block (remove the enclosing /[ /])
      const trimmedContent = part
        .slice(2, -2) // Remove the /[ and /]
        .replace(/^\s*\n|\n\s*$/g, ""); // Remove newlines immediately after /[ and before /]

      return (
        <pre key={index} style={{ whiteSpace: "pre-wrap" }}>
          {trimmedContent}
        </pre>
      );
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
