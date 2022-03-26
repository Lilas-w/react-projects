# 侧边导航+弹窗
## 需求拆解
点击左上角按钮显示侧边栏，点击关闭图标关闭侧边栏<br>
点击showModal按钮显示弹窗，点击关闭图标关闭<br>

## 步骤
### context.js组件
使用React.createContext()创建AppContext，导出。<br>
在AppProvider函数中，传入children并需要展示children。之后会把整个App都包进AppProvider组件。函数内部定义isSidebarOpen、isModalOpen两个state，打开、关闭侧边栏，打开、关闭modal四个函数，返回AppContext.Provider组件，组件的value属性接收这两个state、四个函数。导出。<br>
使用时：<br>
第一种方法：在组件中导入useContext、AppContext函数获取数据。通过useContext(AppContext)就可以获取value的值。<br>
第二种方法：<br>
**自定义hooks**：
useGlobalContext：返回useContext(AppContext)。<br>

### Home组件
使用useGlobalContext()所返回对象中的openSidebar openModal两个函数，作为两个button的onClick回调

### Modal组件
使用useGlobalContext()所返回对象中的isModalOpen状态，closeModal函数

### Sidebar组件
使用useGlobalContext()所返回对象中的isSideBarOpen状态，closeSideBar函数

## 其他难点
1. 按钮CSS
弹跳动画按钮
```
.sidebar-toggle {
  position: fixed;
  top: 2rem;
  left: 3rem;
  font-size: 2rem;
  background: transparent;
  border-color: transparent;
  color: var(--clr-primary-5);
  transition: var(--transition); //all 0.3s linear
  cursor: pointer;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

```
点击变色按钮
```
.btn {
  text-transform: uppercase; //文本大写
  background: var(--clr-black);
  color: var(--clr-white);
  padding: 0.375rem 0.75rem;
  letter-spacing: var(--spacing);
  display: inline-block;   //行内块
  transition: var(--transition);  //all 0.3s linear
  font-size: 0.875rem;
  border: 2px solid var(--clr-black);
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);  //阴影的X轴偏移量、Y轴偏移量、模糊半径、扩散半径和颜色
  border-radius: var(--radius);
  margin: 0.5rem;
}
.btn:hover {
  color: var(--clr-black);
  background: transparent;
}
```
2. 使用语义化标签
aside 侧边栏<br>
main 主页根元素

3. 在className中使用三元表达式决定是否show Modal/Sidebar。弹窗的CSS：<br>
```
.modal-overlay {
  position: fixed;  //元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;  //align-items和justify-items的简写
  transition: var(--transition);
  visibility: hidden;  //不可见，占据页面空间，不会触发重排，触发重绘；无法响应点击事件
  z-index: -1;
}
.show-modal {
  visibility: visible;
  z-index: 10;  //更高堆叠顺序的元素，处于更低堆叠顺序元素的前面。仅在定位元素上奏效
}
```
子盒子为弹窗盒子本身。

## 知识学习
### React.createContext()
```const MyContext = React.createContext(defaultValue);```
创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。<br>
只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。此默认值有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。<br>

### Context.Provider
```<MyContext.Provider value={/* 某个值 */}>```
每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。<br>
Provider 接收一个 value 属性，传递给消费组件。<br>
一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。<br>
当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。从 Provider 到其内部 consumer 组件（包括 .contextType 和 useContext）的传播不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件跳过更新的情况下也能更新。<br>
通过新旧值检测来确定变化，使用了与 Object.is 相同的算法。<br>

### useContext
在函数组件中使用context的方法，而非使用class组件中用的<MyContext.Consumer>。简化了嵌套<br>
```const value = useContext(MyContext);```接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。<br>
useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。<br>
当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。<br>

### 自定义hooks 
名称必须以use开头。