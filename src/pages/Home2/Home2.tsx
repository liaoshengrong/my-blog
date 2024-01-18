import React, { useEffect, useMemo, useState } from "react";
import "./Home2.less";
import txt_list from "./Home.preset";
import useMyNav from "../../router/nav";
import headImg from "./images/head.jpg";

function Home2() {
  const { go } = useMyNav();
  const url = useMemo(() => require(`./images/bg-${random(1, 10)}.jpg`), []);
  const [textItem, setItem] = useState(txt_list[0]);
  const [bgUrl, setBgUrl] = useState(url);
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const onChangeTxt = (e?: any) => {
    e?.stopPropagation();
    const max = txt_list.length - 1;
    setItem(txt_list[random(0, max)]);
  };
  const onChangeBg = (e) => {
    e.stopPropagation();
    setBgUrl(require(`./images/bg-${random(1, 10)}.jpg`));
  };
  const goto = (e, path) => {
    e.stopPropagation();
    go(path);
  };
  useEffect(() => {
    onChangeTxt();
  }, []);
  return (
    <div className="home_container2">
      <div
        className="bg"
        style={{
          backgroundImage: `url(${bgUrl})`,
        }}
      >
        <div className="overlay" />
      </div>
      <div className="outBox" onClick={onChangeBg}>
        <div className="box">
          <div className="header">
            <img src={headImg} alt="" />
            <div className="headBottom">
              <div className="headTxt">Welcome Lucky~</div>
            </div>
          </div>
          <div className="title">Maintain The Habit Of Learning.</div>
          <div className="description" title="换一句" onClick={onChangeTxt}>
            <div className="text">{textItem.text}</div>
            <div className="name">-「{textItem.name}」</div>
          </div>
          <div className="btnBox">
            {list.map((item) => (
              <div
                className="btn"
                key={item.name}
                onClick={(e) => goto(e, item.path)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home2;
const list = [
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
    path: "/home",
  },
];
