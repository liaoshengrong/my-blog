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
const base = "/my-blog/files/";
const list: listProps[] = [
  {
    name: "Taro",
    list: [
      {
        name: "【记录】微信小程序的一些特殊场景（Taro）",
        path: base + "Taro/【记录】微信小程序的一些特殊场景（Taro）.md",
        desc: "哎呀描述",
        date: "2023-06-21",
      },
    ],
  },
  {
    name: "TS",
    list: [
      {
        name: "TS学习记录",
        path: base + "TS/TS学习记录.md",
        desc: "哎呀描述",
        date: "2023-06-21",
      },
    ],
  },
  {
    name: "Browser",
    list: [
      {
        name: "【记录】Cookie跨域",
        path: base + "Browser/【记录】Cookie跨域.md",
        desc: "哎呀描述",
        date: "2023-06-21",
      },
      {
        name: "浏览器缓存",
        path: base + "Browser/浏览器缓存.md",
        desc: "哎呀描述",
        date: "2023-06-21",
      },
    ],
  },
];
export default list;
