import list from "../config/list";

export const preMDFetch = () => {
  list.forEach((item) => {
    item.list.forEach((v) => {
      fetch(v.path);
    });
  });
};
const mountImg = (url) => {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    console.log("onload");
    return true;
  };
};
export const preMountImg = () => {
  Array(10)
    .fill("")
    .forEach((_, i) => {
      const src = require(`../pages/Home/images/bg-${i + 1}.jpg`);
      mountImg(src);
    });
  mountImg(require("../pages/BlogList/images/list-bg.jpg"));
};
