# 导航栏
显示和隐藏导航栏内容。<br>
定义状态showLinks表示导航栏的有无。<br>
使用useRef，定义代表links列表的父盒子的linksContainerRef，和代表links列表的linksRef，动态地获取导航栏盒子的高度<br>

## 优化
旧：用```className={`${showLinks ? 'links-container show-container' : 'links-container'}`} ```实现显示和隐藏导航栏内容，问题在于`show-container`中`height: 10rem;`是给定的，若导航栏内容增多，height不够，则超出盒子，无法显示。<br>
优化：增加ref属性，分别指向linksContainerRef和linksRef，动态地获取导航栏盒子的高度

## 重点难点
设置`height: auto !important;`<br>
所有links的父盒子，其样式的改变是inline的。如不设置，小屏幕中点击隐藏导航栏内容，屏幕变大后导航栏内容消失。<br>
当在一个样式声明中使用一个 !important 规则时，此声明将覆盖任何其他声明。[优先级-MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)<br>

## 知识学习
### useRef
```const refContainer = useRef(initialValue); ```
useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。<br>
ref 是访问 DOM 的主要方式。如果将 ref 对象以 ```<div ref={myRef} />``` 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 .current 属性设置为相应的 DOM 节点。<br>
useRef() 可以方便地保存任何可变值，类似于在 class 中使用实例字段的方式。useRef 会在每次渲染时返回同一个 ref 对象。<br>
useRef.current 属性变化不会主动使页面渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。<br>
如果要在函数内部使用，直接创建后挂ref属性给react元素就行了。<br>
如果要在子组件上使用，除了上面的步骤，还需要使用forwardRef把子组件的函数包起来，然后再传入第二个参数ref，最后挂载ref就可以正常取到DOM了。<br>

### Element.getBoundingClientRect()
返回元素的大小、及其相对于视口的位置，该API返回的 DOMRect对象在现代浏览器中可以被修改。[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

### react-icons/fa
有Facebook、twitter、instagram等图标。<br>
