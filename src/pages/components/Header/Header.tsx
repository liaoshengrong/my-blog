/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Header.less";
function Header() {
  return (
    <div className="header">
      <div className="title">BLOG 荣</div>
      <div className="headerNav">
        <p>首页</p>
        <p>博客列表</p>
        <p>技能标签</p>
        <p>简介</p>
      </div>
    </div>
  );
}

export default Header;
