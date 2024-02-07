import React from "react";
import { useLocation } from "react-router-dom";
import MDRender from "../components/MdRender/MdRender";
import "./Blog.less";
import Header from "../components/Header/Header";
function Blog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const path = location.search.slice(6) + ".md";
  const title = queryParams.get("path").split("/").pop();

  return (
    <div className="blogContainer">
      <Header />
      <div className="blogTitle">{title}</div>
      <div className="ctxContainer">
        <MDRender item={{ path }} />
      </div>
    </div>
  );
}

export default Blog;
