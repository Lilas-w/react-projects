import React from 'react'
import { Link } from 'react-router-dom'

//14 将newCocktails赋予cocktail状态的值，在cocktail组件中渲染出来
const Cocktail = ({ image, name, id, info, glass }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        {/*15 设置跳转到每种cocktail详情页即SingleCocktail页面的按钮*/}
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">details</Link>
      </div>
    </article>
  )
}

export default Cocktail
