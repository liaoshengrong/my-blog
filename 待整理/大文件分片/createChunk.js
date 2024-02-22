import "./sparkmd5.js";
export default async function createChunk(file, index, size) {
  return new Promise((resolve) => {
    const start = index * size;
    const end = start + size;
    const reader = new FileReader();
    const blob = file.slice(start, end);
    reader.onload = (event) => {
      const chunk = event.target.result;
      const hash = SparkMD5.ArrayBuffer.hash(chunk);
      const result = {
        start,
        end,
        index,
        blob,
        hash,
      };
      resolve(result);
    };
    reader.readAsArrayBuffer(file.slice(start, end));
  });
}
