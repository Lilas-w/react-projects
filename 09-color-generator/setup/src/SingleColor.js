import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  //复制值时即会显示
  const [alert, setAlert] = useState(false);

  const bcg = rgb.join(',');

  //使用utils.js中定义的将rgb值转换为16进制的函数
  const hex = rgbToHex(...rgb);

  //将hexValue复制到剪贴板
  const hexValue = `#${hexColor}`;

  //三分钟后alert值消失
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000)
    //在运行另一个setTimeout之前清除timeout
    return () => clearTimeout(timeout)
  }, [alert]);

  return (
    <article
      // 设置inline style以获取背景颜色
      className={`color ${index > 10 && 'color-light'}`}
      //调用rgb()函数，传入从rgb数组中获得的值
      style={{ backgroundColor: `rgb(${bcg})` }}
      // 点击article后将hexValue复制到剪贴板
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hexValue);
      }}
    >
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>{hexValue}</p>
      {/* 将hexValue复制到剪贴板后显示 */}
      {alert && <p className='alert'>copied to clipboard</p>}
    </article>
  )
}

export default SingleColor
