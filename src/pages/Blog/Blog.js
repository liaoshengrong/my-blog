import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MDRender from "../components/MdRender";

function Blog() {
  const location = useLocation();
  console.log(location, "location");
  const [markdownContent, setMarkdownContent] = useState("");
  const getFileContext = () => {
    const path = location.search.slice(6);
    console.log(path, "pathpath");
    fetch(path)
      .then((response) => response.text())
      .then((data) => setMarkdownContent(data))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getFileContext();
  }, []);
  return (
    <div>
      <MDRender content={markdownContent} />
    </div>
  );
}

export default Blog;
