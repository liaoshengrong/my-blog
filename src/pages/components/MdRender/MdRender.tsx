import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "./MdRender.less";
import { useLocation } from "react-router-dom";

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
interface IProps {
  content?: any;
  item?: any;
}
function MDRender({ item }: IProps) {
  const [markdownContent, setMarkdownContent] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (item) {
      fetch(item.path?.includes(".md") ? item.path : item.path + ".md")
        .then((response) => response.text())
        .then((data) => {
          // github
          if (window.location.origin.includes("github")) {
            const newData = data.replaceAll('src="', 'src="' + "/my-blog");
            setMarkdownContent(newData);
            return;
          }

          setMarkdownContent(data);
        });
    }
  }, [item]);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: mdParser.render(markdownContent) }}
    />
  );
}

export default MDRender;
