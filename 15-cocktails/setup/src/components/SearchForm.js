import React from 'react'
import { useGlobalContext } from '../context'
//9 在SearchForm组件中解构出setSearchTerm
const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  //15 
  return (
    <div>
      <h2>search form component</h2>
    </div>
  )
}

export default SearchForm
