import React, { useEffect } from 'react'

const Alert = ({ type, msg, removeAlert, list }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      //removeAlert = 默认参数的showAlert(默认show = false)
      removeAlert();
    }, 3000)
    return () => clearTimeout(timeout);
    //如果第二个参数是空数组，则timeout副作用函数只会在组件挂载时执行一次
    //如果第二个参数是[list]，则timeout副作用函数会在每次list改变时执行
  }, [list])
  //显示信息的样式取决于type类型
  return (<p className={`alert alert-${type}`}>{msg}</p>)
}

export default Alert
