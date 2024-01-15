@[TOC](关于web、ios、android和taro小程序PDF预览和下载)

# PDF 预览原理

PDF 在本地，我们可以直接用浏览器打开 PDF，所以在 ios、Android 和 taro 小程序，我们也可以利用相同的原理，只是多了一些步骤（**权限、下载、创建浏览器容器、打开本地文件**）

## PC web 端

利用 a.download。具体....
忽略

## iOS

相对来说比较简洁

### 预览

利用**react-native-pdf**

```tsx
<Pdf
  prog
  activityIndicator={<Loading visible={true} />}
  source={{
    uri,
    headers, // 可带请求头
  }}
  style={{ flex: 1 }}
  onError={onError}
  onLoadComplete={onLoadEnd}
  onLoadProgress={onLoadProgress}
/>
```

react-native-pdf 的具体使用可以查阅官方

### 下载

利用 RNFS

```js
import RNFS from "react-native-fs";
import { Share } from "react-native";

const handleIOSSaveFlow = async (filename: string, url: string) => {
  const content = await RNFS.readFile(url, "base64");

  // 根据filename生成手机存储的共享路径，例如/user/share/data/pdf/隐私协议
  const copyPath = RNFS.CachesDirectoryPath + "/" + filename;
  RNFS.writeFile(copyPath, content, "base64")
    .then(() => {
      Share.share({
        url: copyPath,
      })
        .then((res) => {
          if (res.action === "sharedAction") {
            RNFS.unlink(copyPath) // 删除共享后的copyFile
              .then()
              // 如果要取消链接的项目不存在，' unlink '将抛出错误
              .catch((err) => {
                console.log(err.message);
              });
          }
        })
        .catch(() => {
          Toast.show(translate("common_error_message"));
        });
    })
    .catch(() => {
      Toast.show(translate("common_download_failed"));
    });
};
```

## Android

### 预览

和 iOS 同理

### 下载

比较繁琐，看代码

```js
import RNFS from "react-native-fs";
const handleAndroidSaveFlow = async (titles: string, url: string) => {
  // 检查是否有写入权限、Permission.check内部需要自行封装
  if (!(await Permission.check("write_external_storage"))) {
    Toast.show(translate("common_download_failed"));
    return;
  }
  // 如果文件名有“/”，会被识别为文件路径
  const title = titles?.replace(/[/\s]/g, ""); // remove slashes and Spaces
  const content = await RNFS.readFile(url, "base64");
  // 拿到本地的存储路径 xxx/title
  let downloadDest = `${RNFS.DownloadDirectoryPath}/${title}`;

  async function downloadFileWithUniqueName(title: string): Promise<string> {
    // 检查该文件是否已经存在
    const exists = await RNFS.exists(`${title}.pdf`);
    // 如果存在，需要自动换个文件名，例如"xxx/title(1).pdf" 要递归处理
    if (exists) {
      title = modifyTitle(title); // 这个方法在下面👇🏻
      return downloadFileWithUniqueName(title);
    }

    return title;
  }

  downloadDest = await downloadFileWithUniqueName(downloadDest);
  // 写入文件
  RNFS.writeFile(`${downloadDest}.pdf`, content, "base64")
    .then(() => {
      Toast.show(translate("common_download_success"), { type: "Successful" });
    })
    .catch((error) => {
      console.log(error, "errr");
      Toast.show(translate("common_download_failed"));
    });
};

// change title to title(1), change title(1) to title(2)
const modifyTitle = (title: string) => {
  const regex = /\((\d+)\)$/; // 匹配括号内的数字
  const match = title.match(regex);

  if (match) {
    const n = parseInt(match[1]);
    return title.replace(regex, `(${n + 1})`); // 将括号中的数字替换为n+1
  } else {
    return `${title}(1)`;
  }
};
```

## Taro 小程序

### 预览 下载

Taro 的底层就是 wx，所以都封装的很简洁

```js
export const openPDF = (url: string, title: string) => {
  console.log(Taro.env.USER_DATA_PATH, "USER_DATA_PATH");
  Taro.downloadFile({
    url,
    filePath: `${Taro.env.USER_DATA_PATH}/${title}.pdf`,
    success: function (res) {
      Taro.openDocument({
        filePath: res.filePath,
        fileType: "pdf",
      });
    },
  });
};
```

## 留言

有任何没写清楚的，请 v+ **laoyin666it**
