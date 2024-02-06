// "homepage": "https://liaoshengrong.github.io/my-blog/",
// "homepage": "https://puppet.pages.dev/",
const fs = require("fs");
const packageJson = require("./package.json");

const environment = process.argv[2]; // 从命令行参数获取环境标识
let homepage;

switch (environment) {
  case "github":
    homepage = "https://liaoshengrong.github.io/my-blog/";
    break;
  case "cloud":
    homepage = "https://puppet.pages.dev/";
    break;
  default:
    homepage = "/";
}

packageJson.homepage = homepage;

fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
