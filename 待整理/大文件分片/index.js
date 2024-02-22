import cutFile from "./cutfile.js";

const inp = document.getElementsByTagName("input")[0];
// 大文件分片
// 1、固定每一片的大小
// 2、使用file.slice()切割文件
// 3、利用FileReader读取每一片的文件并使用sparkMd5生成唯一的hash值
// 4、由于文件分片过程比较耗时，所以利用Worker创建多线程来处理
inp.onchange = async (e) => {
  const file = e.target.files[0];
  console.time("cutFile");
  const chunks = await cutFile(file);
  console.log(chunks, "chunks");
  console.timeEnd("cutFile");
};
