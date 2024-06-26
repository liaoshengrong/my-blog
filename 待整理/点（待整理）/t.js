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
 * http
 * 1、http 和 https
 *  http:无状态、明文传输 tcp 3个包
 *  https: 有状态、加密传输 tcp 3个包 + ssl 9个包 需要证书
 * 2、http1.1 和 http2.0
 *  并发数量增加
 *  h2.0对Header数据压缩，提高传输效率
 */
/**
 * new
 * 1、创建新对象obj
 * 2、obj.__proto__ = Person.Prototype
 * 3、Person.call(obj)
 * 4、返回一个新对象
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
 *
 * jsx -> render function -> vDom(react Element) -> fiber(wip) -> dom
 */

/**
 * Redux
 * 面向 JS 应用程序的 可预测状态容器
 * 为了解决 组件通信 和 组件状态共享 的方案
 * 工作流程
 *  1、使用connect链接store后
 *  2、组件通过dispatch一个action
 *  3、store通过reducer更新state
 *  4、因为store通过subscribe监听state变化
 *  5、所以store可以通知对应组件进行更新
 */

/**
 * React fiber
 *  结构：链表（深度遍历优先的树）
 *  解决了：react需要进行diff计算后才更新dom，会导致页面卡顿的问题
 *
 *  核心原理：
 *   增量渲染和优先级调度
 *    1、将 同步不可中断 变为 异步可中断
 *    2、将任务区分优先级，低优先级的任务将在空闲时间调用（模拟requestIdCallback）
 *  异步处理：
 *    将大任务拆分成许多fiber任务，判断浏览器的每一帧是否有空闲时间，
 *    如果没空就存储当前任务的指针（挂起任务），有空则读取指针（恢复任务）
 *
 *  因为vdom是react Element元素，只记录了子节点，所以不可中断
 *  fiberNode记录了父节点、兄弟节点、子节点，打断后，也可以通过指针找到对应关系
 */

/**
 * fiber的机制
 *  创建fiberRoot
 *  调用beginWork，构建workInProgress树
 *  替换current树（视图渲染层）
 * 更新也是先创建wip树，替换current树
 *
 * 双缓存模式
 * current树、wip树
 * 缓存这两个树，通过指针进行切换：以减少性能损耗
 */

/**
 * react事件处理原理
 *  为抹平浏览器和平台之间的差异，react对事件进行了封装
 *  委托：将事件委托给document
 *  合成：将blur/change/input/keydown/keyup等事件合成为onChange
 */

/**
 * router 定义路由和组件的映射关系
 * 为什么要有router
 *   早期一个URL对应一个页面，导致频繁刷新
 *   ajax的出现，解决了局部刷新（SPA的关键），将所有页面合成为一个页面（SEO差）
 * 原理
 *   拦截用户刷新操作
 *   根据不同的url，渲染不同的组件
 * 模式
 *  HashRouter
 *    监听#后面的url，触发hashchange
 *  BrowserRouter
 *    html5中的history api
 *    监听popState
 */

/**
 * setState后发生了什么
 *  1. 将新的state合并到当前组件的状态中
 *  2. 创建新的fiber节点（wip tree）也叫vdom，节点包含更新后的状态、属性和类型
 *  3. diff计算：wip tree和current tree开始走所谓的协调（reconciliation）过程, 通过节点的类型、key等信息来确定是否需要更新
 *  4. 将比较结果放到更新的任务队列中，使用浏览器插帧渲染的方式，做异步处理
 *  5. 更新完成后，React会将wip树设为current树，方便下次diff
 *
 * ahook
 *  在原本hooks的基础上封装了更方便我们使用的hooks
 *
 * React.lazy
 *  代码分割，用于实现按需加载的组件，也即路由懒加载
 *
 * hooks解决了什么问题
 *  - 函数组件 状态
 *  - 类组件太繁琐
 *  - 代码简化和复用
 *  - 代码性能优化
 *  - 更好的ts支持
 *
 * react虚拟dom
 *   为什么？
 *    React本身机制导致不得不使用vdom，每次更新都会重新render，使用虚拟dom进行批量更新，避免频繁的操作dom
 *   原理
 *    通过react.createElement创建vdom，再形成对应的fiber树，wip树和current树，每次更新会创建新的vdom和wip树对比后，进行批量更新
 *   流程
 *    div -> react.createElement() == wip tree -> current tree -> view
 *    updated: div -> createElement == diff current -> current tree
 */

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
