const CHUNK_SIZE = 1024 * 1024 * 2;
// 线程
const THREAD_COUNT = navigator.hardwareConcurrency || 4;
export default async function cutFile(file) {
  return new Promise((resolve) => {
    const count = Math.ceil(file.size / CHUNK_SIZE);
    const chunkCount = Math.ceil(count / THREAD_COUNT);
    const chunks = [];
    let threadBackCount = 0;
    for (let i = 0; i < THREAD_COUNT; i++) {
      // 使用多线程 效率提高了4-5倍
      const worker = new Worker("./worker.js", { type: "module" });
      let end = i * chunkCount + chunkCount;
      if (end >= count) {
        end = count;
      }

      worker.postMessage({
        file,
        index: i,
        start: i * chunkCount,
        end: end,
        chunkCount,
        CHUNK_SIZE,
      });

      worker.onmessage = (event) => {
        chunks[event.data.index] = event.data.chunks;
        threadBackCount++;
        if (threadBackCount === THREAD_COUNT) {
          resolve(chunks.flat());
        }
        worker.terminate();
      };
    }
  });
}
// 浏览器最大并发数 6 