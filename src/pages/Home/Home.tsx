import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const go = (path) => {
    navigate(path);
  };
  console.log("build-develop", "asdfsfasdf");
  return (
    <div>
      <div onClick={() => go("/home")}>首页</div>
      <div onClick={() => go("/blog-list")}>Blog list</div>
    </div>
  );
}

export default Home;
