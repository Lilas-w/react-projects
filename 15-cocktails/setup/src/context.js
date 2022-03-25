import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  //6 设置基础state值
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  //11 fetch data函数
  //初始时和每次在输入框中输入时，都会调用fetchDrinks函数，所以每次都要先将loading状态改为true；
  const fetchDrinks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      console.log(data);
      if (drinks) {
        //12 遍历drinks,获取id name image info glass
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass
          }
        })
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  //12 设置useEffect函数，调用fetchDrinks函数
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm])

  //7 传入value以使得所有组件可以使用
  return (
    <AppContext.Provider value={{
      loading, cocktails, setSearchTerm
    }}>{children}</AppContext.Provider>
  );
}
// make sure use
//8 确保使用GlobalContext
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
