# 自动化的实现流程

## lokalise sync script

目前的同步自动化遵循一下规则

- 本地每次 commit 时，都会触发 lokalise 更新
- 本地只允许新增 key，其他操作都在 lokalise 端进行（更新/删除）
- 如果你的 commit 报错了，而又比较紧急，可以使用 git commit -m "xxx" --no-verify
- hotfix 分支会自动跳过 lokalise 自动化同步 5.如果你的 hotfix 内容需要更新 i18n 的内容，请手动在两端进行更新

> 注意：在 commit 时，请确保你的电脑有网络

### 代码实现

代码文件位置：`lokalise/sync.js`  
**大致思路：**

1. 将远端的文件 fetch 到本地，转成 json 文件，然后进行比较

```js
const response = await fetch(options.fetchUrl, options.params);
const data = await response.json();
await downloadAndUncompress(data.bundle_url, tempSavePath);
// ... (存储、调整操作后)
// 使用jsondiff插件进行比较
const compareResult = jsonDiff.diff(localJson, remoteJson, {
  keepUnchangedValues: true,
  keysOnly: false,
});
```

2. 获取比较后的文件，检测到本地有新增 key，则暂时绕过同步

```js
const compareResultContent = JSON.stringify(compareResult, null, "\t");

const regex = new RegExp("__deleted");
if (regex.test(compareResultContent)) {
  // If the new key is detected, keep the diff result and wait until the for is over
  diffRes[`${lang}_${prefix}`] = compareResultContent;
}
```

3. 同步完没有新增 key 的文件后，开始走 create key 的逻辑

代码文件位置：`lokalise/config.js` 4.根据 lokalise create key Api，我们先调整数据结构

```js
const keys = flattenKeys(enDiffRes, langArr, "", lang_obj);
```

> 我们知道带有\_\_delete 的 key，是需要取出来进行 create 的,但是我们并不知道在 json 的那一层，所以 flattenKeys 内部在进行递归，具体逻辑需要自行耐心查看，如果有更好的方法，请告知

4. 走完 create keys 后，需要再次把远端的 json 文件，同步到本地

```js
// create keys
fetch(url, options).then((res) => {
  if (res.status === 200) {
    syncCreateToLocal(keys, langArr, branch, lang_obj);
    return true;
  }
  return false;
});
```

5. 同步更新完这些文件后，commit 执行完毕

但是同步后文件并不会在 commit 里，还需要执行一下步骤

- git add packages/app/common/i18n
- git commit -m "sync auto commit" --no-verify

> 这些是自动化执行，在 git hook 的 post-commit 里，以产生新的 commit

### 不足之处

1. 开发人员需要同时维护两端，比较麻烦，且容易出错（eg：英文的更新）
2. hotfix i18n 的内容不会同步到 lokalise

**考虑：**

- 增加脚本流程，把英文的更新也放到本地
- hotfix 不做单纯的跳过同步，而是在脚本中使用 git status 检查是否有 i18n 文件的更改，有的话再进行同步，没有则跳过

## unit test 的自动检测

原因：我们修改 `VM` 层时，容易忘记修改对应的 unit test，所以我将会把以下流程加入到 `commit-msg` 中。

1、每次 commit 之前都需要检查 unit test 的运行情况
2、如果运行失败，则不能进行 commit 操作
3、如遇到紧急情况，可以在 commit 里增加(skip-commit)，则可以跳过 jest 检查，正常 commit

### 代码实现

1. 跳过 Merge Request、 sync auto commit 和 skip-test 的检查

```bash
# Check if commit message contains "Merge branch|pull"
if echo "$commit_msg" | grep -Eq "Merge (branch|pull)"; then
  exit 0
fi

# Check if commit message contains "sync auto commit"
if echo "$commit_msg" | grep -Eq "sync auto commit"; then
  exit 0
fi

# Check if commit message contains (skip-test)
if echo "$commit_msg" | grep -q "(skip-test)"; then
  tip $YELLOW "Skipping tests due to (skip-test) in commit message." true
```

2. 运行 npm run test,并获取退出码

```bash
set +e
npm run test
exit_code=$?
wait $exit_code
# Check if the exit code is non-zero (indicating test failure)
if [ $exit_code -ne 0 ]; then
    # Using ANSI color codes to print in red
    tip $RED "Tests failed. Commit aborted." true
    tip $YELLOW "  Maybe you changed the code in the viewModel file, but forgot to change the code in the test file."
    tip $YELLOW "  Suggestion: Run yarn test, correct the test error file, and then commit." true
    tip $RED "If you need an urgent submission, you can add (skip-test) to your commit message to skip unit test checks, for example:" true
    tip $GREEN "  git commit -m \"$commit_msg(skip-test)\"${NC}" true
    exit 1
fi

# 封装一些常量和函数
YELLOW='\033[1;33m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

tip() {
    local color=$1
    local message=$2
    local showMargin=${3:-false} # Default value is true

    if [ "$showMargin" = true ]; then
        echo "${color}${message}${NC}\n"
    else
        echo "${color}${message}${NC}"
    fi
}

```

> 需要注意的点是 npm run test 如果报错，会直接打断 commit,无法抛出哦我们想给的提示，所以需要一个 set +e
