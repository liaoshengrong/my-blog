/**
 * 1、前端工程化
 * 前端的一系列管理工具，给开发者降本增效，例如：
 * 代码规范、模块划分、单元测试、性能优化等一系列工具
 * 把这些工具汇集在一起的过程叫做工程化
 *
 * 工程化2个问题
 * 语言问题：
 *   兼容性：core-js做Polyfill
 *   语法增强：其他插件
 * 使用代码转化工具 babel 预设（一堆插件）@babel/core @babel/preset-env
 *
 * 2、模块化
 * 所有的功能都可以进行分解和聚合
 * 作用: 解决js中文件引入冲突问题（聚合）
 * 例如：1.js、2.js、3.js有互相引入时，我们该怎么写script标签引入顺序
 * 标准：
 *   Commonjs： 民间标准 在运行时确定引用关系 require('./.')
 *   ES6： ES6标准 在编译时确定引用关系 import './.'
 */

/**
 * SPA 首屏问题
 *
 * 具体情况具体分析
 * 1、接口请求
 * 2、资源请求
 * 3、图片资源
 * 4、渲染阻塞
 * 解决方案
 * 1、后端优化接口
 * 2、资源文件压缩
 * 3、图片压缩
 * 4、路由按需加载
 * 5、组件是否重复打包
 * 6、缓存资源
 * 7、使用SSR
 * 具体实现
 * 2、文件压缩 webpack 里配置gzip
 * 3、图片压缩 tinify工具 cdn
 * 4、路由按需加载 路由懒加载 React.lazy(() => import('./OtherComponent'))
 * 5、组件是否重复打包 webpack 里配置minChunks:3 引用超过3次的组件会放到Common里
 * 6、设置cacheControl max-age等缓存字段
 * 7、渲染阻塞可以考虑web Worker
 *
 */

/**
 * 正向代理和反向代理
 * 正向：对服务器隐藏客户端
 * 反向：对客户端隐藏服务器
 *
 * 正向代理：webpack config proxy 客户端自己配的的代理服务器
 *  流程：客户端 -> 代理服务器 -> 目标服务器
 * 反向代理：
 *  说明：服务端自己配的代理服务器，我们不知道真实的服务器，只管给代理服务器发请求
 *  流程：客户端 -> 代理服务器 -> ???服务器
 *
 *
 * CORS
 * 简单请求：后端配置Access-Control-Allow-Origin
 * 预检请求：
 *   前端修改了请求头会触发 或 content-type：application/json
 *   OPTIONS请求带有origin和Access-Control-Request-Headers和method，
 *   后端识别该请求后可以返回max-age：45678
 * Cookie跨域
 *   前端配置withCredentials: true
 *   后端配置Access-Control-Allow-Credentials: true
 *   或前端配置：Cookie.SameSite: none // 需要https
 * localStorage 跨域
 *   这个是跨域存储的意思
 *   使用iframe或window.open
 *   postmessage和onmessage进行操作
 */

/**
 * React生命周期
 * 一、创建阶段
 *   1、constructor 初始化状态属性
 *   2、getDerivedStateFromProps(nextProps,preState) return的对象作为state值，return null表示不更新state
 *   3、render 渲染
 *   4、componentDidMount 挂载
 * 二、更新阶段
 *   1、getDerivedStateFromProps(nextProps,preState)
 *   2、shouldComponentUpdate(nextProps, nextState) return true表示更新
 *   3、render 渲染
 *   4、getSnapshotBeforeUpdate 视图更新前 获取dom信息，做临时调整
 *   5、componentDidUpdate 视图更新后执行
 * 三、卸载阶段
 *   1、componentWillUnmount 卸载
 */

/**
 * React理解
 * React是用于构建用户界面的JavaScript库，他主要的设计思想是：
 * 组件化：开放-封闭原则
 *   开放：组件之间可以通过props进行通信
 *   封闭：组件可以独立渲染，内部的状态由自身维护
 * 数据驱动视图： UI=f(data)
 *  通过修改数据来驱动视图的更新
 * 虚拟dom
 *  在浏览器渲染的流水线中，操作真实dom是非常昂贵的，所以react提供了虚拟dom，通过对比虚拟dom和真实dom来增量更新视图
 */

/**
 * Redux
 * 面向 JS 应用程序的 可预测状态容器
 */

/**
 * http
 * 1、http 和 https
 *  http:无状态、明文传输 tcp 3个包
 *  https: 有状态、加密传输 tcp 3个包 + ssl 9个包 需要证书
 * 2、http1.1 和 http2.0
 *  并发数量增加
 *  h2.0对Header数据压缩，提高传输效率
 */

/**
 * webpack 打包优化
 * 1、多线程打包 thread-loader 官方推荐。使用：[thread-loader,less-loader]
 * 2、多进程打包 HappyPack 但官方不再维护
 * 3、缓存 cache-loader 对于开销大的loader进行cache
 * 4、高速缓存 HardSourceWebpackPlugin 存在node_modules中，关键cacheDirectory  第一次正常打包，第二次提升90%
 * 5、静态资源打包使用cdn：react react-router axios
 * 6、考虑删除sourceMap，减少体积
 */

/**
 * BFC 块级格式化上下文
 * 独立的渲染区域，让空间里的子元素不受到外面布局的影响，同时也不影响外部元素
 * 1、overflow不为visible
 * 2、position为absolute，fixed
 * 3、display为inline-block，flex、grid、table等
 */

/**
 * 判断手机web和pc
 *  1、navigator.userAgent
 *  2、navigator.platform
 *  3、window.screen
 *  4、window.innerWidth
 */

/**
 * React fiber
 *  结构：链表（深度遍历优先的树）
 *  解决了：react需要进行diff计算后才更新dom，会导致页面卡顿的问题
 *  核心原理：
 *    1、将 同步不可中断 变为 异步可中断
 *    2、将任务区分优先级，低优先级的任务将在空闲时间调用（模拟requestIdCallback）
 *  异步处理：
 *    将大任务拆分成许多fiber任务，判断浏览器的每一帧是否有空闲时间，
 *    如果没有就存储当前任务的指针（挂起任务），有则读取指针（恢复任务）
 */

/**
 * react事件处理原理
 * 
 * react router
 * redux原理、流程
 * setState后发生了什么
 * ahook
 * React.lazy原理
 * hooks解决了什么问题
 * useEffect原理
 *  手写myUseEffect
 * react虚拟dom
 *   为什么？
 *   原理
 *   流程
 * diff和Vue的diff区别
 */