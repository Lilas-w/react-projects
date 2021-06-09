import React, { useState } from 'react';
import data from './data';
import SingleQuestion from './Question';

function App() {
  const [questions, setQuestions] = useState(data); //初始值是什么？
  /* const { title, info } = data[index]; */

  /* return (
    <>
      <section className = 'container'>
      <header>
        <h1>question and answers about login</h1>
        <h4></h4>
      </header>
        <div className='question'>
          <h4>{title}</h4>
          <p>{info}</p>
        </div>
      </section>
    </>
  ); */
  return (
    <main>
      <div className='container'>
        <h3>questions and answers about login</h3>
        <section className='info'>
          {
            questions.map((question) => {
              return <SingleQuestion key={question.id} {...question} />
            })
          }
        </section>
      </div>
    </main>
  )
}

export default App;
