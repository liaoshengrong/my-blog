import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import routers from "./router";
import "react-markdown-editor-lite/lib/index.css";
import "highlight.js/styles/vs2015.css";
import React from "react";
function App() {
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
