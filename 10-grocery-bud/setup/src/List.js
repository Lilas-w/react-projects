import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        //使用解构赋值获取list属性
        const { id, title } = item;
        return (
          <article key={id} className='grocery-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              {/* 用于编辑的按钮 */}
              <button
                type='button'
                className='edit-btn'
                //点击后获取特定item的id，传给editItem函数
                onClick={() => editItem(id)}
              >
                <FaEdit />
                {/* 用于删除的按钮 */}
              </button>
              <button
                type='button'
                className='delete-btn'
                //点击后获取特定item的id，传给removeItem函数
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
              {/* 有两个按钮后，就可以在App.js中使用条件渲染了*/}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
