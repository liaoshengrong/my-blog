export interface FilesProps {
  name: string;
  path: string;
  desc: string;
  date: string;
}
interface listProps {
  name: string;
  list: FilesProps[];
}
const base = window.location.pathname + "files/";
console.log(window.location.pathname, "location");

const list: listProps[] = [
  {
    name: "Taro",
    list: [
      {
        name: "【记录】微信小程序的一些特殊场景（Taro）",
        path: base + "Taro/【记录】微信小程序的一些特殊场景（Taro）",
        desc: "小程序对于特殊场景的一些api",
        date: "2023-12-16",
      },
    ],
  },
  {
    name: "TS",
    list: [
      {
        name: "TS学习记录",
        path: base + "TS/TS学习记录",
        desc: "Ts中常用的一些语法",
        date: "2020-10-21",
      },
    ],
  },
  {
    name: "Browser",
    list: [
      {
        name: "【记录】Cookie跨域",
        path: base + "Browser/【记录】Cookie跨域",
        desc: "关于跨域接口携带cookie",
        date: "2021-7-21",
      },
      {
        name: "浏览器缓存",
        path: base + "Browser/浏览器缓存",
        desc: "浏览器对于文件的获取方式",
        date: "2022-06-21",
      },
      {
        name: "【记录】浏览器渲染原理",
        path: base + "Browser/【记录】浏览器渲染原理",
        desc: "浏览器在输入url后，发生了什么？？",
        date: "2022-02-21",
      },
      {
        name: "JS事件循环",
        path: base + "Browser/JS事件循环",
        desc: "浏览器是怎么处理如此繁琐复杂的任务？？",
        date: "2021-06-21",
      },
    ],
  },
  {
    name: "download",
    list: [
      {
        name: "【记录】关于web、ios、android和taro小程序PDF预览和下载",
        path:
          base +
          "download/【记录】关于web、ios、android和taro小程序PDF预览和下载",
        desc: "各有千秋，但原理一致",
        date: "2023-12-26",
      },
    ],
  },
  {
    name: "ajax",
    list: [
      {
        name: "常见的请求头和响应头",
        path: base + "ajax/常见的请求头和响应头",
        desc: "我们经常看到的请求中，都有什么？？分别是什么意思？",
        date: "2023-12-26",
      },
    ],
  },
];
export default list;
