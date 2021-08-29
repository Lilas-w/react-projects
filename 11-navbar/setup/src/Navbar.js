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

  //每当showLinks改变，调用useEffect
  useEffect(() => {
    //linksRef.current节点
    //使用JS中的getBoundingClientRect()返回元素的大小及其相对于视口的位置，该API返回的 DOMRect对象在现代浏览器中可以被修改
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
        {/* 之前用className={`${showLinks?'links-container show-container':'links-container'}`} 实现显示和隐藏导航栏内容*/}
        {/* 问题在于show-container中height: 10rem;是给定的，若导航栏内容增多，height不够，则无法显示在页面中 */}
        {/* 增加ref属性，指向linksContainerRef */}
        <div className="links-container" ref={linksContainerRef}>
          {/* 增加ref属性，指向linksRef */}
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
