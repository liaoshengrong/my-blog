/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Header.less";
import useMyNav from "../../../router/nav";
const list = [
  {
    name: "首页",
    path: "/home",
  },
  {
    name: "博客列表",
    path: "/blog-list",
  },
  {
    name: "技能标签",
    path: "",
  },
  {
    name: "简介",
    path: "",
  },
];
function Header() {
  const { go } = useMyNav();
  const goTo = (path) => {
    if (!path) alert("暂未开放");
    go(path);
  };

  return (
    <div className="header">
      <div className="title">BLOG 荣</div>
      <div className="headerNav">
        {list.map((item) => (
          <p key={item.name} onClick={() => goTo(item.path)}>
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Header;
