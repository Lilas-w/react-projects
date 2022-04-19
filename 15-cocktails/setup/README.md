## 需求拆解
一个鸡尾酒展示页面，导航栏切换页面、搜索功能、每种鸡尾酒点击查看详情。
1. 导航栏-component/Navbar组件。使用Link组件修改地址栏，借由App.js中的BrowserRouter对应地渲染home、about页面。
2. 鸡尾酒展示列表-component/CocktailList组件，内含Cocktail、Loading组件
3. 搜索鸡尾酒名称-component/SearchForm组件
4. 单个鸡尾酒详情页-pages/SingleCocktail组件
5. 关于我们-pages/About组件
6. 错误页面-pages/Error组件

## 重点难点
1. 使用CSS写loading动画
```
.loader,
.loader:before,
.loader:after {
  background: transparent;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  color: var(--primaryColor);
  text-indent: -9999em;
  margin: 88px auto;
  margin-top: 20rem;
  position: relative;
  font-size: 3rem;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
```

## 知识学习
### 1.react-router(v5)
路由：是跟后端服务器进行交互的一种方式，通过不同的路径，请求不同的资源。请求不同的页面是路由的其中一种功能。<br>

安装：react-router-dom 依赖 react-router，只需要安装相应环境下的库即可，不用再显式安装 react-router。npm 会自动解析 react-router-dom 包中 package.json 的依赖并安装。基于浏览器环境的开发，只需要安装 react-router-dom; 基于 react-native 环境的开发，只需要安装 react-router-native<br>

react-router: 封装了Router，Route，Switch等核心组件,实现了从路由的改变到组件的更新的核心功能。用作下面几个包的运行时依赖项(peer dependency)。<br>

react-router-dom: 用于 React WEB 应用的路由依赖. 基于 react-router，加入了在浏览器运行环境下的一些功能，例如：用于跳转的Link组件。还有histoy模式下的 BrowserRouter 和 hash模式下的 HashRouter 组件，用了history库中createBrowserHistory和createHashHistory方法,前者使用 pushState 和 popState 事件构建路由;后者使用 window.location.hash 和 hashchange 事件构建路由<br>

BrowserRouter 是一个 Router，它使用 HTML5的history API (pushState、 replaceState 和 popState 事件)保持 UI 与 URL 同步。使用浏览器地址栏中的 URL 在 React-application 中进行内部“路由”。 因此，即使地址栏中的 URL 发生了变化，页面的内容也可以通过 Javascript 来操作，浏览器也不会从服务器加载新的内容。 使用后退和前进操作，以及制作书签，仍然像在传统网页上一样合乎逻辑。<br>

组件Route，基于浏览器的 URL 渲染对应组件。<br>

用一个Switch组件包装要基于 url 渲染的组件<br>

Link组件修改地址栏,如to='/'<br>

通过 useParams 函数访问 url 参数(如要显示的鸡尾酒的 id)<br>

通过 useHistory 函数，组件可以访问一个 history 对象，用于编程化地修改浏览器的 url。比如 history.push('/') 使浏览器的 url 更改为/<br>

Redirect组件重定向,如to='/'<br>