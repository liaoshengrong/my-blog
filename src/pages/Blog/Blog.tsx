import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MDRender from "../components/MdRender/MdRender";
import "./Blog.less";
import Header from "../components/Header/Header";
function Blog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const path = location.search.slice(6) + ".md";
  const title = queryParams.get("path").split("/").pop();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={isMobile ? "mobileBlogContainer" : "blogContainer"}>
      <Header isHide={isMobile} />
      <div className="blogTitle">{title}</div>
      <div className="ctxContainer">
        <MDRender item={{ path }} />
      </div>
    </div>
  );
}

export default Blog;
