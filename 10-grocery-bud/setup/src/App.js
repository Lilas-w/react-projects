import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  //key='list'
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  //list用于本地存储
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  //点击编辑或删除按钮时，显示信息
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //值为空的时候，页面弹出警示信息
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      //值不为空且正在编辑
      setList(list.map((item) => {
        if (item.id === editID) {
          //是editID，复制item，修改title值为name
          return { ...item, title: name }
        }
        //并非editID，原样返回item
        return item;
      }))
      //恢复初始值
      setName('');
      setEditID(null);
      setIsEditing(false);
      //显示修改的信息
      showAlert(true, 'success', 'value changed');
    } else {
      //显示成功信息
      showAlert(true, 'success', 'item added to the list');
      //创建newItem，加入list中；因为有list,所以需要id
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      //最后将name恢复为空字符串
      setName('');
    }
  }

  //改变Alert的值
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  //创建一个clearList函数以清除全部值
  const clearList = () => {
    //显示清除list的信息
    showAlert(true, 'danger', 'empty list');
    //清除list值
    setList([]);
  }

  //在List组件中使用
  //删除单个item
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    //当item的id和选择的id匹配，则让其不再存在于list中
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    //返回与选中的item id匹配的item
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    //显示该item于输入框中
    setName(specificItem.title);
  }

  useEffect(() => {
    //每次list改变，存储新值；每次刷新页面时[]重新为空
    localStorage.setItem('list', JSON.stringify(list), [list])
  })

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {/* 向Alert组件传递alert的所有属性,然后在alert组件中构建。传递list状态值以设置useEffect第二个参数 */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)} />
          {/* 如果是在编辑，按钮文字显示未edit，否则显示submit */}
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      { /* 当有第一个item时，就可以看到List组件中的编辑、删除按钮 */}
      {list.length > 0 && (
        <div className='grocery-container'>
          {/* 给List组件传入list state ,传入removeItem editItem函数。在List组件中构建*/}
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
