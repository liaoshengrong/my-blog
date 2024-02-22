import createChunk from "./createChunk.js";
onmessage = async (e) => {
  const { file, start, end, CHUNK_SIZE, index } = e.data;
  const proms = [];
  for (let i = 0; i < end - start; i++) {
    const chunk = createChunk(file, i, CHUNK_SIZE);
    proms.push(chunk);
  }
  const chunks = await Promise.all(proms);
  postMessage({ chunks, index });
};
