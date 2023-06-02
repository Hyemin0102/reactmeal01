import React from 'react';
import CartContext from './cart-context';

const CartProvider = (props) => {
  const removeItemFromCartHandler = (item) => {};
  const addItemToCartHandler = (item) => {};
  
  //업데이트 될 객체 따로 만들어줌 - 계속 값이 변하는 부분
  const cartContext = {
    items:[],
    totalAmount: 0, 
    addItem: addItemToCartHandler, //함수 따로 생성해서 변수에 담아줌
    removeItem: removeItemFromCartHandler
  }
  return (
    <CartContext.Provider value={cartContext}>
      {/* 생성한 CartContext에 provider 붙혀줌.
      value는 CartContext 선언한거 그대로 가져오면 초기화 상태기때문에 업데이트될 객체 따로 만듦*/}
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;