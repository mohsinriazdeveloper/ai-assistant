import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { dracula, CopyBlock } from "react-code-blocks";
import "katex/dist/katex.min.css";

const MarkDown = ({ content }) => {
  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        // children={content}
        className="whitespace-normal"
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline && match) {
              // remove the newline character at the end of children, if it exists
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
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          table({ children, ...props }) {
            return (
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "36px",
                  lineHeight: "20px",
                }}
                {...props}
              >
                {children}
              </table>
            );
          },
          // Add CSS styles to the table row
          tr({ children, ...props }) {
            return (
              <tr style={{ backgroundColor: "#f8f8f8" }} {...props}>
                {children}
              </tr>
            );
          },
          // Add CSS styles to the table cell
          td({ children, ...props }) {
            return (
              <td
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
                {...props}
              >
                {children}
              </td>
            );
          },
          th({ children, ...props }) {
            return (
              <th
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  fontWeight: 600,
                  textAlign: "left",
                  fontSize: "16px",
                }}
                {...props}
              >
                {children}
              </th>
            );
          },
          a({ href, children, ...props }) {
            return (
              <>
                <a href={href} {...props} target="_blank">
                  {children}
                </a>
              </>
            );
          },
          ul({ children }) {
            return <ul>{children}</ul>;
          },
          ol({ children, props }) {
            return <ol {...props}>{children}</ol>;
          },
          li({ children, ...props }) {
            // If children is a string, apply the transformation
            if (typeof children === "string") {
              children = children.replace(/(\d+\.)\s*\n\s*/g, "$1 ").trim();
            }
            return <li {...props}>{children}</li>;
          },
          p({ children, ...props }) {
            return (
              <p style={{ marginTop: "0" }} {...props}>
                {children}
              </p>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default memo(MarkDown);
// export default ReactMarkDownComponent;
