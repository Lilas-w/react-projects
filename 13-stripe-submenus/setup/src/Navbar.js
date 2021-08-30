import React from 'react'
import logo from './images/logo.svg'
import { FaBars } from 'react-icons/fa'
//10 依次在需要改变状态的组件中导入useGlobalContext
import { useGlobalContext } from './context'

const Navbar = () => {
  //11 解构 useGlobalContext() 返回的对象
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();
  // 12...13 location： 制作鼠标经过导航栏各按钮时可随鼠标移动的下拉菜单
  const displaySubmenu = (e) => {
    //Node 接口的 textContent 属性表示一个节点及其后代的文本内容。
    const page = e.target.textContent;
    //Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
    const tempBtn = e.target.getBoundingClientRect();
    //找按钮中间
    const center = (tempBtn.left + tempBtn.right) / 2;
    //将subMenu提高3px
    const bottom = tempBtn.bottom - 3;

    openSubmenu(page, { center, bottom });
    //接着更改context.js里的openSubmenu参数
  }

  const handleSubmenu = (e) => {
    // 30 如果只写closeSubmenu，就无法打开下拉菜单了
    if (!e.target.classList.contains('link-btn')) {
      closeSubmenu();
    }
  }
  // 29 鼠标在nav且不在导航栏按钮上时，也隐藏下拉菜单
  return (
    <nav className="nav" >
      <div className="nav-center" onMouseOver={handleSubmenu}>

        <div className="nav-header">
          <img src={logo} className="nav-logo" alt="stripe" />
          <button className="btn toggle-btn" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>

        <ul className="nav-links">
          {/* 鼠标经过时onMouseOver */}
          <li><button className="link-btn" onMouseOver={displaySubmenu}>products</button></li>
          <li><button className="link-btn" onMouseOver={displaySubmenu}>developers</button></li>
          <li><button className="link-btn" onMouseOver={displaySubmenu}>company</button></li>
        </ul>

        <div className="btn signin-btn">Sign in</div>
      </div>
    </nav>
  )
}

export default Navbar
