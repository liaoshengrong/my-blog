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
 * 使用代码转化工具 babel 预设（一堆插件） @babel/preset-env
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
 *   OPTIONS请求带有Access-Control-Request-Headers: content-type，
 *   后端配置：Access-Control-Allow-Headers: Content-Type   //允许的header
 * Cookie跨域
 *   前端配置withCredentials: true
 *   后端配置Access-Control-Allow-Credentials: true
 *   或前端配置：Cookie.SameSite: none // 需要https
 */
