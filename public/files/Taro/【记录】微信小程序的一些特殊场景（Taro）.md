# 登录

1.  使用 Taro.login()获取 code
2.  将 code 传给后端获取 token/open_id
3.  获取 useInfo 授权（可选）

```js
const res = await Taro.login();
await getToken(res.code); // 后端接口
```

# 微信支付

1.  先调用后端支付接口，应当返回如下参数
2.  将后端返回的参数，传入`Taro.requestOrderPayment`

```ts
interface Option {
  /** 时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间 */
  timeStamp: string;
  /** 随机字符串，长度为32个字符以下 */
  nonceStr: string;
  /** 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*** */
  package: string;
  /** 订单信息，仅在需要校验的场景下需要传递 */
  orderInfo?;
  /** 外部 APP 用户 ID */
  extUserUin?: string;
  /** 签名算法 */
  signType?: keyof SignType;
  /** 签名 */
  paySign: string;
}
```

```js
const res = await pay(); // 后端接口
Taro.requestOrderPayment({
  ...res,
  success: (res1) => {
    // do something
    console.log(res1, "requestOrderPayment success");
  },
  fail: (err) => {
    toast("去借钱 " + total);
    console.log(err, "requestOrderPayment err");
  },
});
```

# 分享小程序

1.  在全局配置 app.config.ts 中添加`enableShareAppMessage: true`
2.  在 app.tsx/page.tsx 中添加`Taro.showShareMenu`
3.  在可分享的页面中添加`Taro.useShareAppMessage`钩子

```js
// app.config.ts
export default defineAppConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

// app.tsx
Taro.showShareMenu({
  showShareItems: ["wechatFriends", "wechatMoment"],
});

// home/index.tsx或者其他页面me/index.tsx
Taro.useShareAppMessage((res) => {
  return {
    title: "邀您一起KO一杯～今日一切都OK！",
    imageUrl: icons.icon_share, // 自定义封面
    path: `/pages/home/index?token=${getLoad("token")}`, // 自定义path，可以在router.params里获取参数
  };
});
```

# 触发 Tabbar 和 back，不刷新 page

1.  针对 Tabbar，可以使用`Taro.useTabItemTap(callback)`
2.  back 问题，可以使用`Taro.useDidShow(callback)`，Tabbar 切换也会触发

```js
// page.tsx
Taro.useTabItemTap({
  // some init function
});
Taro.useDidShow({
  // some init function
});
```

# 弹窗问题

在小程序中首栈页面的弹窗中，点返回按钮会退出小程序。
可使用 Taro 自带的 PageContainer 组件

```jsx
import { PageContainer } from "@tarojs/components";

<PageContainer
	show={showRegionPop}
	onClickOverlay={() => setShowRegionPop(false)}
	round
	className="backdrop"
>
	{* some components *}
</PageContainer>
```

# 路由栈限制问题

官方说明,页面栈不可超过 10 个，每次使用 navigateTo 都会增加一个。
大于 10 个需要手动清空`Taro.reLauch`
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/6b0454db792446399d2d5e68cb6c64f6.png)

1.  封装自定义跳转、back 函数
2.  使用`getCurrentPages().map(v => v.route)`获取当前页面栈数量
3.  当大于 10，使用`reLauch`清空，并额外存储这 10 个记录
4.  这样返回就会有问题，检测当前页面是否为页面栈第 0 项,是则`reLauch`到该路由,并移除一个存储中的页面

```js
export const navTo = (url: string) => {
  const routers = getCurrentPages().map((v) => v.route);
  if (routers.length >= 10) {
    setLoad("routers", routers); // 存storage
    Taro.reLaunch({ url });
    return;
  }
  Taro.navigateTo({ url });
};

export const navBack = () => {
  const routers = getCurrentPages().map((v) => v.route);
  const saveRouters = getLoad("routers");
  if (routers.length === 1) {
    if (saveRouters.length === 1) {
      Taro.navigateBack();
      return;
    }
    Taro.reLaunch({ url: saveRouters.at(-1) });
    saveRouters.pop();
    setLoad("routers", saveRouters);
    return;
  }
  Taro.navigateBack();
};
```

# 留言

该文章持续记录中....
有任何没写清楚的，请联系 v+ **laoyin666it**
