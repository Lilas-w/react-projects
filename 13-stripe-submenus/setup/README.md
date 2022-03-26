# 动态下拉菜单 useContext+useRef
## 需求拆解
导航栏：点击导航栏选项，显示下拉菜单；鼠标经过导航栏各按钮时，下拉菜单可随鼠标移动<br>
- 仅展示该按钮对应得菜单；
- 按links个数决定下拉菜单的宽度；
- 据按钮的位置决定下拉菜单的位置；

小屏导航栏隐藏，点击按钮弹窗导航栏<br>

## 步骤
### Context组件
新增localtion page状态，修改openSubmenu函数<br>
### Navbar组件
从 useGlobalContext()中取得openSidebar, openSubmenu, closeSubmenu函数<br>

定义displaySubmenu，制作动态下拉菜单：<br>
- 仅展示该按钮对应得菜单；
- 据按钮的位置决定下拉菜单的位置；

使用Node.textContent获取当前节点文本，使用Element.getBoundingClientRect() 获取返回元素的left、right、bottom值(除了width 和 height 以外的属性,是相对于视图窗口的左上角来计算的)。调用openSubmenu函数，传入page，和center、bottom值<br>
修改context组件中的openSubmenu函数。<br>

### Hero组件
主页面中心内容。从 useGlobalContext()中取得closeSubmenu函数。鼠标经过hero部分时隐藏下拉菜单。<br>

### Sidebar组件
从 useGlobalContext()中取得isSidebarOpen状态, closeSidebar函数。余类似12 Sidebar，三元表达式，渲染列表<br>

### Submenu组件 ★
从 useGlobalContext()中取得isSubmenuOpen状态，三元表达式决定显示、隐藏<br>
用**useRef**定义指向aside导航栏的container对象，在location改变时调用useEffect，改变container.current的行内式CSS属性，从而改变下拉菜单位置。  ——useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）<br>
- 按links个数决定下拉菜单的宽度；

定义columns状态，随下拉菜单的变化更改列表数，使用CSS grid布局完成，如```grid-template-columns: repeat(2, 1fr);``` <br>

## 重点难点
1. 改变下拉菜单位置。用**useRef**定义指向aside导航栏的container对象，在location改变时调用useEffect，改变container.current的行内式CSS属性
2. 按links个数决定下拉菜单的宽度。定义columns状态，随下拉菜单的变化更改列表数，使用CSS grid布局完成
3. 局部调用:仅在经过button时显示对应下拉菜单。使用if判断，当元素类名不为link-btn，调用closeSubmenu函数
    ```
    const handleSubmenu = (e) => {
        //如果只写closeSubmenu，就无法打开下拉菜单了
        if (!e.target.classList.contains('link-btn')) {
        closeSubmenu();
        }
    }
    ```
## 知识学习
鼠标经过事件，onMouseOver<br>
Node 接口的 textContent 属性指当前节点的文本，同时会返回所有子节点的文本。innerText 可操作已被渲染的内容， 而 textContent 则不会.[Node.textContent-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)
