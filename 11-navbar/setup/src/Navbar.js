import React, { useState, useRef, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
  //显示和隐藏导航栏内容
  const [showLinks, setShowLinks] = useState(false);
  //使用useRef动态地获取导航栏盒子的高度
  //for the div
  const linksContainerRef = useRef(null);
  //for the links
  const linksRef = useRef(null);

  //showLinks改变时，让links列表的父盒子高度 = 0 or 所有列表的高度和
  useEffect(() => {
    //linksRef.current节点
    //使用linksRef而非linksContainerRef，因为links-container初始值为0，toggle后也为0
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      //div高度等于当前所有links的高度
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px'
    }
  }, [showLinks]);

  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='logo' alt='logo' />
          <button
            className='nav-toggle'
            onClick={() => setShowLinks(!showLinks)}>
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {/* 将数据分离，而非hardcode，方便增删修改。 遍历links*/}
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              )
            })}
          </ul>
        </div>

        { /* 遍历显示图标 */}
        <ul className="social-icons">
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar
