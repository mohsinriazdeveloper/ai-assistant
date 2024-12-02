import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { dracula, CopyBlock } from "react-code-blocks";
import "katex/dist/katex.min.css";
const preprocessText = (text) => {
  return text.replace(/([^\n])\n([^\n-])/g, "$1\n\n$2");
};
const MarkDown = ({ content }) => {
  const example = preprocessText(content);
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        className="whitespace-normal"
        components={{
          h1({ children, ...props }) {
            return (
              <h1
                style={{
                  fontSize: "2em",
                  fontWeight: "bold",
                  margin: "1em 0",
                  color: "#333",
                }}
                {...props}
              >
                {children}
              </h1>
            );
          },
          h2({ children, ...props }) {
            return (
              <h2
                style={{
                  fontSize: "1.75em",
                  fontWeight: "bold",
                  margin: "1em 0",
                  color: "#444",
                }}
                {...props}
              >
                {children}
              </h2>
            );
          },
          p({ children, ...props }) {
            return (
              <p
                style={{
                  marginTop: "0.5em",
                  marginBottom: "0.5em",
                  fontSize: "1em",
                  color: "#555",
                }}
                {...props}
              >
                {children}
              </p>
            );
          },
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline && match) {
              const codeString = String(children).replace(/\n$/, "");

              return (
                <CopyBlock
                  text={codeString}
                  language={match[1]}
                  showLineNumbers={false}
                  wrapLongLines
                  theme={dracula}
                  {...props}
                />
              );
            }
            return (
              <code
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "0.2em 0.4em",
                  borderRadius: "4px",
                  fontSize: "0.95em",
                  fontFamily: "monospace",
                }}
                {...props}
              >
                {children}
              </code>
            );
          },
          blockquote({ children, ...props }) {
            return (
              <blockquote
                style={{
                  borderLeft: "4px solid #ccc",
                  margin: "1em 0",
                  padding: "0.5em 1em",
                  fontStyle: "italic",
                  color: "#666",
                  backgroundColor: "#f9f9f9",
                }}
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          ul({ children, ...props }) {
            return (
              <ul
                style={{
                  listStyleType: "disc",
                  marginLeft: "1.5em",
                  marginBottom: "1em",
                }}
                {...props}
              >
                {children}
              </ul>
            );
          },
          ol({ children, ...props }) {
            return (
              <ol
                style={{
                  listStyleType: "decimal",
                  marginLeft: "1.5em",
                  marginBottom: "1em",
                }}
                {...props}
              >
                {children}
              </ol>
            );
          },
          li({ children, ...props }) {
            return (
              <li
                style={{
                  marginBottom: "0.5em",
                }}
                {...props}
              >
                {children}
              </li>
            );
          },
          table({ children, ...props }) {
            return (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  margin: "1em 0",
                  fontSize: "1em",
                  textAlign: "left",
                }}
                {...props}
              >
                {children}
              </table>
            );
          },
          th({ children, ...props }) {
            return (
              <th
                style={{
                  padding: "0.5em",
                  borderBottom: "2px solid #ddd",
                  textAlign: "left",
                }}
                {...props}
              >
                {children}
              </th>
            );
          },
          td({ children, ...props }) {
            return (
              <td
                style={{
                  padding: "0.5em",
                  border: "1px solid #ddd",
                }}
                {...props}
              >
                {children}
              </td>
            );
          },
          a({ href, children, ...props }) {
            return (
              <a
                href={href}
                style={{ color: "#007bff", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {example}
      </ReactMarkdown>
    </div>
  );
};

export default memo(MarkDown);
