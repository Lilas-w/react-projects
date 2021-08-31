import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}

const AppProvider = ({ children }) => {
  //1 useReducer需要初始状态和reducer函数（在reducer组件中定义）
  const [state, dispatch] = useReducer(reducer, initialState);

  //7 设置dispatch的函数，并传入CartContainer组件中，和其UI结构的属性中，并传入AppProvider中，再设置reducer.js中的reducer函数
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  }
  //9 以下同理7、8，传入CartItem组件
  //payload是什么？
  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id })
  }
  //10 以下同理9传入CartItem组件
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id })
  }

  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id })
  }

  //12 异步获取和展示数据，接着在reducer组件中设置
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart })
  }
  useEffect(() => {
    fetchData();
  }, [])

  //11 state.cart改变时执行useEffect，设置reducer.js时使用reduce()函数
  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart])

  //13 将10加减函数变成一个函数
  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
