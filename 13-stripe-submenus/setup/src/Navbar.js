import React from 'react'
import logo from './images/logo.svg'
import { FaBars } from 'react-icons/fa'
//10 依次在需要改变状态的组件中导入useGlobalContext
import { useGlobalContext } from './context'

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();

  //显示下拉菜单
  const displaySubmenu = (e) => {
    const page = e.target.textContent;  //当前节点及子节点的文本
    const tempBtn = e.target.getBoundingClientRect();  //元素的大小+相对于视口的位置
    //找按钮中间
    const center = (tempBtn.left + tempBtn.right) / 2;
    //将subMenu提高3px
    const bottom = tempBtn.bottom - 3;

    openSubmenu(page, { center, bottom });
  }

  const handleSubmenu = (e) => {
    //如果只写closeSubmenu，就无法打开下拉菜单了
    if (!e.target.classList.contains('link-btn')) {
      closeSubmenu();
    }
  }

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
          {/* 绑定鼠标经过事件 */}
          <li><button className="link-btn" onMouseOver={displaySubmenu}>products</button></li>
          <li><button className="link-btn" onMouseOver={displaySubmenu}>developers</button></li>
          <li><button className="link-btn" onMouseOver={displaySubmenu}>company</button></li>
        </ul>

        <button className="btn signin-btn">Sign in</button>
      </div>
    </nav>
  )
}

export default Navbar
