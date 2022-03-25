# 购物清单
## 需求拆解
1. 添加新的物品
2. 改变现有物品
3. 删除现有物品
4. 将物品列表存储到本地
5. 提示信息。输入值为空、添加成功、改变成功、删除成功、全部清空时，有对应信息和样式。

## 步骤
### APP组件
使用useState、useEffect函数，和localStorage存储。<br>
定义物品名name字符串、本地存储list、正在编辑isEditing布尔值(用以改变button文本和判断handleSubmit的情况)、正在编辑的物品ID editID、警示内容alert对象五种状态。<br>

handleSubmit函数：e.preventDefault()阻止默认提交。三种情况。<br>
- 空值，弹出警示信息；
- 有值且正在编辑，利用setList、map函数和editID改变对应物品，恢复name、editID、isEditing的初值，弹窗；
- 加入列表，创建newItem对象，id可设为new Date().getTime().toString()，setList后，恢复name初值，弹窗。

定义showAlert函数以使用setAlert，传入show布尔值（默认false不显示）、type、文字信息。<br>

定义clearList函数以清空list，弹窗。<br>

定义removeItem函数以删除单个物品，使用filter。<br>

定义editItem函数以获取选中物品，使用find函数。将name放入输入框，改变isEditing和editID<br>

App组件返回弹窗Alert组件、输入框、提交按钮，和List组件、清空按钮。<br>
### Alert组件
接收alert对象全部属性，showAlert函数，list数组。<br>
在list改变时，调用useEffect中的
{...alert} removeAlert={showAlert} list={list}<br>
根据type值选择css样式，使用定时器3秒后消息消失<br>

### List组件
使用react-icons/fa图标库中的FaEdit编辑图标，FaTrash删除图标<br>

## 重点难点
因为需要多次使用setAlert，所以定义showAlert函数以使用setAlert<br>

## 知识点学习
只读的window.localStorage 属性允许访问一个Document 源（origin）的对象 Storage。localStorage 类似 sessionStorage，但其区别在于：存储在 localStorage 的数据可以长期保留；而当页面被关闭时，存储在 sessionStorage 的数据会被清除 。<br>
可通过 Storage.setItem() 增加数据项目，另有getItem() removeItem() clear()<br>
localStorage中不能直接保存对象。必须将对象信息转换成json对象<br>

useEffect不写第二个参数，每次刷新页面时[]重新为空<br>

JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的 reviver 函数用以在返回之前对所得到的对象执行变换(操作)。<br>

setTimeout返回值timeoutID是一个正整数，表示定时器的编号。这个值可以传递给clearTimeout()来取消该定时器。<br>

react-icons/fa图标<br>