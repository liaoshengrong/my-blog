import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { saveAs } from "file-saver";
import marked from "marked";
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

function BlogEdit() {
  const [context, setContext] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const handleEditorChange = ({ html, text }) => {
    setContext(text);
    setHtmlText(html);
  };
  const exportMd = () => {
    const blob = new Blob([context], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "file.md");
  };

  const exportHtml = () => {
    console.log(marked(htmlText));
    const blob = new Blob([marked(htmlText)], {
      type: "text/html;charset=utf-8",
    });
    saveAs(blob, "file.html");
  };

  return (
    <div>
      <div onClick={() => exportMd()}>导出为md文件</div>
      <div onClick={() => exportHtml()}>导出为html文件</div>
      <MdEditor
        style={{ height: "80vh" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default BlogEdit;
