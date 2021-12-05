## Idea

[https://uidesigndaily.com/](https://uidesigndaily.com/posts/sketch-birthdays-list-card-widget-day-1042)

## 场景
列表数据加载

## 功能
过生日的人数
过生日用户列表：从本地数据data.js文件中加载数据，列表数据包含用户的id、name（姓名）、age（年龄）、image（头像图片地址）。
一个清除数据的按钮

## 实现
### 1.构建List.js组件
组件即将传入的props即data.js中定义的列表对象，被命名为{people}。
使用map函数渲染列表中的每一个person。
使用对象解构赋值，获取每一个person的id、name（姓名）、age（年龄）、image（头像图片地址）。
组件返回渲染好的过生日用户列表UI描述。

### 2.构建App.js组件
引入data和List组件。
App函数里，使用useState加载data.js里的数据，定义people状态变量接收data数据。
使用语义化标签构建待返回的页面：添加过生日人数的文字，插入List组件且给其people属性传入people状态变量，添加按钮绑定onClick事件以在点击时触发setPeople将列表清空。
组件返回渲染好的页面UI描述。

### 3.在index.js组件中渲染页面
引入reactDOM、css文件、App组件
使用ReactDOM.render将App组件渲染到页面上去
