import React from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

export const mdParser = new MarkdownIt({
  typographer: true,
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre style="padding: 1em;" class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre style="padding: 1em;" class="hljs"><code>' +
      mdParser.utils.escapeHtml(str) +
      "</code></pre>"
    );
  },
});

function MDRender({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: mdParser.render(content) }} />;
}

export default MDRender;
