//2 设置reducer函数
const reducer = (state, action) => {
    //8 使用if语句改变对应type的状态对象的元素值
    if (action.type === "CLEAR_CART") {
        return { ...state, cart: [] };
    }
    //9 
    if (action.type === "REMOVE") {
        return { ...state, cart: state.cart.filter((cartItem) => cartItem.id !== action.payload) }
    }
    //10 注意state中amount的增加、减少方法
    if (action.type === "INCREASE") {
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
                return { ...cartItem, amount: cartItem.amount + 1 }
            }
            return cartItem;
        })
        return { ...state, cart: tempCart };
    }
    if (action.type === "DECREASE") {
        let tempCart = state.cart
            .map((cartItem) => {
                if (cartItem.id === action.payload) {
                    return { ...cartItem, amount: cartItem.amount - 1 }
                }
                return cartItem;
            })
            .filter((cartItem) => cartItem.amount !== 0)
        return { ...state, cart: tempCart };
    }

    if (action.type === "GET_TOTALS") {
        //reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
        //const reducer = (accumulator, currentValue) => accumulator + currentValue;
        //array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            const itemTotal = price * amount;
            cartTotal.total += itemTotal;
            cartTotal.amount += amount;
            return cartTotal;
        }, {
            total: 0,
            amount: 0
        })
        //精确到小数点后两位
        total = parseFloat(total.toFixed(2));

        return { ...state, total, amount }
    }

    if (action.type === "LOADING") {
        return { ...state, loading: true };
    }
    if (action.type === "DISPLAY_ITEMS") {
        return { ...state, cart: action.payload, loading: false };
    }
    //13 将10加减函数和为一个函数
    if (action.type === "TOGGLE_AMOUNT") {
        let tempCart = state.cart
            .map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    if (action.payload.type === 'inc') {
                        return { ...cartItem, amount: cartItem.amount + 1 }
                    }
                    if (action.payload.type === 'dec') {
                        return { ...cartItem, amount: cartItem.amount - 1 }
                    }
                }
                return cartItem;
            })
            .filter((cartItem) => cartItem.amount !== 0);
        return { ...state, cart: tempCart }
    }
    throw new Error("no matching action type");

}

export default reducer;