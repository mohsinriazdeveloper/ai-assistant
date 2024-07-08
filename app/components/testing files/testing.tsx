import { useState } from "react";
import pdfToText from "react-pdftotext";

// eslint-disable-next-line react/prop-types
const PdfReader = () => {
  const [text, setText] = useState("");

  function extractText(event: any) {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text) => {
        setText(text);
      })
      .catch((error) =>
        console.error("Failed to extract text from pdf", error)
      );
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" accept="application/pdf" onChange={extractText} />
      </header>

      <main>text length {text.length}</main>
    </div>
  );
};

export default PdfReader;
