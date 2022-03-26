import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from './context'

//下拉菜单
const Submenu = () => {
  const {
    isSubmenuOpen,
    location,
    page: { page, links }
  } = useGlobalContext();

  //指向aside标签
  const container = useRef(null);

  //下拉菜单列表数
  const [column, setColumn] = useState('col-2');

  useEffect(() => {
    const submenu = container.current;
    const { center, bottom } = location;
    //使用行内式CSS变更submenu位置
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    //变更下拉菜单列表数
    setColumn('col-2');
    if (links.length === 3) {
      setColumn('col-3')
    }
    if (links.length > 3) {
      setColumn('col-4')
    }
  }, [location])

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
