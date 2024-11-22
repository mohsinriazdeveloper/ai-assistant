import React, { FC } from "react";
import { InlineMath, BlockMath } from "react-katex";

// Utility function to split text and math parts
const parseMathInText = (text: string) => {
  const content =
    "Sure, here are a few common math formulas:\n\n1. **Area of a Circle**:\n   \\[\n   A = \\pi r^2\n   \\]\n   where \\( A \\) is the area and \\( r \\) is the radius.\n\n2. **Quadratic Formula**:\n   \\[\n   x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\n   \\]\n   where \\( a \\), \\( b \\), and \\( c \\) are coefficients of the quadratic equation \\( ax^2 + bx + c = 0 \\).\n\n3. **Pythagorean Theorem**:\n   \\[\n   a^2 + b^2 = c^2\n   \\]\n   where \\( a \\) and \\( b \\) are the legs of a right triangle and \\( c \\) is the hypotenuse.\n\n4. **Slope of a Line**:\n   \\[\n   m = \\frac{y_2 - y_1}{x_2 - x_1}\n   \\]\n   where \\( (x_1, y_1) \\) and \\( (x_2, y_2) \\) are two points on the line.\n\n5. **Simple Interest**:\n   \\[\n   I = PRT\n   \\]\n   where \\( I \\) is the interest, \\( P \\) is the principal amount, \\( R \\) is the rate of interest, and \\( T \\) is the time.\n\n6. **Circumference of a Circle**:\n   \\[\n   C = 2\\pi r\n   \\]\n   where \\( C \\) is the circumference and \\( r \\) is the radius.\n\nIf you need more specific formulas or have any other questions, feel free to ask!";

  // Updated regex to handle inline/block math expressions, Markdown headings, and custom patterns
  const parts = text.split(
    /(\$\$[^$]*\$\$|\$[^$]*\$|\\\[.*?\\\]|\\\(.*?\\\)|\*\*[^*]*\*\*|\*[^\*]*\*|###.*?)/gs
  );

  // const parts = content.split(
  //   /(\$\$[^$]*\$\$|\$[^$]*\$|\\\[.*?\\\]|\\\(.*?\\\)|\*\*[^*]*\*\*|\*[^\*]*\*|###.*?)/gs
  // );

  return parts.map((part, index) => {
    if (part.startsWith("###")) {
      // Render Markdown heading (remove the ### and trim)
      return <h3 key={index}>{part.slice(3).trim()}</h3>;
    } else if (part.startsWith("\\[") && part.endsWith("\\]")) {
      // Render block math (remove the enclosing \[ \])
      return <BlockMath key={index} math={part.slice(2, -2).trim()} />;
    } else if (part.startsWith("[ ") && part.endsWith(" ]")) {
      // Render block math (remove the enclosing \[ \])
      return <InlineMath key={index} math={part.slice(2, -2).trim()} />;
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
      // Handle regular text, ensuring no characters are split incorrectly
      return <span key={index}>{part}</span>;
    }
  });
};

const MathTextParser: FC<{ content: string }> = ({ content }) => {
  const example =
    "o forecast net sales for 2018, we can look at the trend from previous years. Here are the net sales for Amazon from 2015 to 2017: - 2015: 107,006million−∗∗2016:∗∗107,006million−∗∗2016:∗∗135,987 million - 2017: 177,866 million We can see a consistent increase in net sales year over year. One way to estimate the 2018 net sales is to calculate the average growth rate and apply it to the 2017 net sales. 1. *Growth from 2015 to 2016:* [ \text{Growth Rate} = \frac{135,987 - 107,006}{107,006} approx 0.2701 \text{ or } 27.01% ] 2. *Growth from 2016 to 2017:* [ \text{Growth Rate} = \frac{177,866 - 135,987}{135,987} approx 0.3074 \text{ or } 30.74% ] 3. *Average Growth Rate:* [ \text{Average Growth Rate} = \frac{27.01% + 30.74%}{2} approx 28.88% ] 4. *Forecast for 2018:* [ \text{2018 Net Sales} = 177,866 \times (1 + 0.2888) approx 229,158 \text{ million} ] So, a reasonable forecast for Amazon's net sales in 2018 would be approximately229,158 million. If you have any other questions or need further assistance, feel free to ask!";
  return <>{parseMathInText(content)}</>;
};

export default MathTextParser;
