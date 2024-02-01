import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MDRender from "../components/MdRender/MdRender";
import "./Blog.less";
// import mdtx from "raw-loader!./a.md";
import Header from "../components/Header/Header";
function Blog() {
  const location = useLocation();
  const path = location.search.slice(6);
  const title = location.state.title;
  // eslint-disable-next-line import/no-webpack-loader-syntax
  const mdtx = require("raw-loader!./a.md");
  console.log(mdtx, "mdtxmdtx");
  fetch(mdtx)
    .then((res) => {
      console.log(res);
      // console.log(res.text());
      return res.text();
    })
    .then((res) => {
      console.log(res, "asdfasdf");
    });

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
