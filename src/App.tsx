import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import routers from "./router";
import "react-markdown-editor-lite/lib/index.css";
import "highlight.js/styles/vs2015.css";
import React, { useEffect, useRef } from "react";
import { preMDFetch, preMountImg } from "./utils";
function App() {
  const timer = useRef(null);
  const addEvent = () => {
    document.onvisibilitychange = () => {
      clearTimeout(timer.current);
      if (document.visibilityState === "hidden") {
        document.title = "看不见我~🙈看不见我~🙈";
      }
      if (document.visibilityState === "visible") {
        document.title = "(๑•̀⑂•́) ✧被发现了～";
        timer.current = setTimeout(() => {
          document.title = "BLOG 荣";
        }, 2000);
      }
    };
  };
  useEffect(() => {
    addEvent();
    preMDFetch();
    preMountImg();
  }, []);
  return (
    <div className="root">
      <Routes>
        {routers.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
