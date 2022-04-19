# 购物车 useContext+useReducer进行性能优化
## 需求拆解
清空购物车
增删单品
总数量
总价格

## 步骤
### context组件
设置initialState<br>
在AppProvider中使用useReducer，传入reducer函数和initialState<br>
设置dispatch的函数，导出；传入CartContainer组件中使用；设置reducer.js中的reducer函数，据标识调用相应方法。
### reducer组件
定义reducer函数，接收state 和 action。导出。<br>
action.type包括清空购物车、移除单项物品、计算总数和总价、加载与否、加减物品数量，分别处理后返回相应状态。对不匹配action的情况进行错误处理<br>
可以把增加物品数量和减少物品数量合并为一个函数。<br>

### App组件
根据全局变量loading状态决定是否加载 <Navbar /><CartContainer />页面

### CartContainer组件
获取全局变量cart, total, clearCart。如果cart长度为0时返回购物车标题和为空提醒。返回购物车标题、主体（使用map渲染表单，给CartItem组件传入item.id，返回）、底部（总数量、清空按钮）。

### CartItem组件
获取全局变量remove, toggleAmount（替代increase, decrease）。返回物品图片，标题，价格，删除物品按钮，数量，增、减物品按钮。<br>
对增、减物品按钮使用svg。<br>
```
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
    <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
</svg>
```

### Navbar组件
亦通过svg，配合CSS实现购物袋右上角显示物品数量的效果。

## 知识学习
### useReducer
```const [state, dispatch] = useReducer(reducer, initialArg, init);```<br>
useState 的替代方案，解耦了操作逻辑(action)和后续的行为(一般是 UI 的更新)。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。第二个参数 initialArg 是状态初始值。第三个参数 init 是懒惰初始化函数。<br>

在一个值为对象的初始状态initialArg中有很多属性，一旦呼叫dispatch，传入相应的action，就会在reducer函数中改变状态。<br>

适用场景，如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。假如层级过深，还可以搭配 context 使用，因为 dispatch 在 re-render 时不变，不会引起使用 context 的组件执行无意义的更新，起到性能优化的作用。<br>

React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 dispatch。<br>
如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。（React 使用 Object.is 比较算法 来比较 state。）<br>

### svg
使用svg代替react icon。SVG 指可伸缩矢量图形 (Scalable Vector Graphics)，图像在放大或改变尺寸的情况下其图形质量不会有损失。SVG 图像可通过文本编辑器来创建和修改，可被搜索、索引、脚本化或压缩，是可伸缩的，可在任何的分辨率下被高质量地打印。<br>
使用 XML 编写，SVG 文件必须使用 .svg 后缀来保存。[SVG-MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG)<br>

### Number.prototype.toFixed(digits)
digits小数点后数字的个数；介于 0 到 20 （包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0。
