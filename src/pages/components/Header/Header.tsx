/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
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
function Header({ isHide }: { isHide?: boolean }) {
  const { go } = useMyNav();
  const goTo = (path) => {
    if (!path) alert("暂未开放");
    go(path);
  };
  useEffect(() => {
    const sticky = document.getElementById("header");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(entry.intersectionRatio);
          entry.target.classList.toggle(
            "isSticky",
            entry.intersectionRatio < 1
          );
        });
      },
      { threshold: [1] }
    );
    observer.observe(sticky);
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className={isHide ? "mobileHeader" : "header"} id="header">
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
