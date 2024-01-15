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
        date: "2023-12-16",
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
        date: "2020-10-21",
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
        date: "2021-7-21",
      },
      {
        name: "浏览器缓存",
        path: base + "Browser/浏览器缓存.md",
        desc: "哎呀描述",
        date: "2022-06-21",
      },
    ],
  },
  {
    name: 'download',
    list: [
      {
        name: "【记录】关于web、ios、android和taro小程序PDF预览和下载",
        path: base + "download/【记录】关于web、ios、android和taro小程序PDF预览和下载.md",
        desc: "哎呀描述",
        date: "2023-12-26"
      },
    ]
  },
  {
    name: 'ajax',
    list: [
      {
        name: "常见的请求头和响应头",
        path: base + "ajax/常见的请求头和响应头.md",
        desc: "哎呀描述",
        date: "2023-12-26"
      },
    ]
  }
];
export default list;
