import React, { useState } from 'react';
import data from './data';
function App() {
  //count：获取多少段落
  const [count, setCount] = useState(0);
  //初始文本设置为空数组
  const [text, setText] = useState([]);

  //return中调用需要定义handleSubmit函数
  const handleSubmit = (e) => {
    //阻止表单默认的提交后刷新行为
    e.preventDefault();

    let amount = parseInt(count);
    //最多只能显示8段
    if (amount <= 0) {
      amount = 1;
    }
    if (amount > 8) {
      amount = 8;
    }
    setText(data.slice(0, amount));
  }

  return (
    //其次设置页面结构和样式
    <section className='section-center'>
      <h3>tired of boring lorem ipsum?</h3>

      <form className='lorem-form' onSubmit={handleSubmit}>
        <label htmlFor='amount'>
          paragraphs:
        </label>
        <input
          type='number'
          name='amount'
          id='amount'
          value={count}
          //使用内联函数设置事件目标的值
          onChange={(e) => setCount(e.target.value)}
        />
        <button type='submit' className='btn'>generate</button>
      </form>

      <article className='lorem-text'>
        {text.map((item, index) => {
          return <p key={index}>{item}</p>
        })}
      </article>
    </section>
  )
}

export default App;
