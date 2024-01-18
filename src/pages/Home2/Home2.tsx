import React, { useEffect, useMemo, useState } from "react";
import "./Home2.less";
import txt_list from "./Home.preset";
import useMyNav from "../../router/nav";
function Home2() {
  const { go } = useMyNav();
  const [textItem, setItem] = useState(txt_list[0]);
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  //   const url = useMemo(() => require(`./images/bg-${random(1, 4)}.jpg`), []);
  const url = useMemo(() => require(`./images/bg-${2}.jpg`), []);

  useEffect(() => {
    const max = txt_list.length - 1;
    setItem(txt_list[random(0, max)]);
  }, []);
  return (
    <div className="home_container2">
      <div
        className="bg"
        style={{
          backgroundImage: `url(${url})`,
        }}
      >
        <div className="overlay" />
      </div>
      <div className="outBox">
        <div className="box">
          <div className="header" />
          <div className="title">Maintain The Habit Of Learning.</div>
          <div className="description">
            <div className="text">{textItem.text}</div>
            <div className="name">-「{textItem.name}」</div>
          </div>
          <div className="btnBox">
            {list.map((item) => (
              <div
                className="btn"
                key={item.name}
                onClick={() => go(item.path)}
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
    path: "",
  },
];
