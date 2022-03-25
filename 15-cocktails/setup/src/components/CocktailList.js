import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

//10 在CocktailList里解构出cocktails，loading以使用
const CocktailList = () => {
  const { cocktails, loading } = useGlobalContext();

  //在打字寻找cocktail时也需要loading组件
  if (loading) {
    return <Loading />
  }
  //在搜索不到对应页面时显示
  if (cocktails.length < 1) {
    return (
      <div className="section-title">
        no cocktails matched your search
      </div>
    );
  }
  //13将由获取的newCocktails数据组成的cocktailList渲染出来
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((item) => {
          return <Cocktail key={item.id} {...item} />
        })}
      </div>
    </section>
  )
}

export default CocktailList
