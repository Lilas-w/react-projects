import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from './context'

//点击导航栏按钮后显示的下拉菜单，鼠标在导航栏按钮间移动下拉菜单可随之移动
const Submenu = () => {
  const {
    isSubmenuOpen,
    location,
    page: { page, links }
  } = useGlobalContext();

  //18 useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）
  //Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素
  const container = useRef(null);

  //25 随下拉菜单的变化更改列表数和下拉菜单边框大小
  const [column, setColumn] = useState('col-2');

  //17 每次location变化执行副作用函数
  useEffect(() => {
    //20 获得DOM节点
    const submenu = container.current;
    //21 从location中获取center bottom值
    const { center, bottom } = location;
    //22 使用行内式CSS变更submenu位置
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    //27 更改column状态
    setColumn('col-2');
    if (links.length === 3) {
      setColumn('col-3')
    }
    if (links.length > 3) {
      setColumn('col-4')
    }
  }, [location])
  //22继续在context中操作，获得正确的下拉菜单
  return (
    //19 添加ref属性
    //26 将className='submenu-center col-2'改为className={`submenu-center ${columns}`}
    <aside
      className={`${isSubmenuOpen ? 'submenu show' : 'submenu'}`
      }
      ref={container}
    >
      <h4>{page}</h4>
      <div className={`submenu-center ${column}`}>
        {links.map((link, index) => {
          const { label, icon, url } = link;
          return <a key={index} href={url}>
            {icon}
            {label}
          </a>
        })}
      </div>
    </aside>
  )
}

export default Submenu
