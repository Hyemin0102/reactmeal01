import React, { useReducer } from 'react';
import CartContext from './cart-context';

//리듀서 함수 정의(상태, 액션 파라미터 필요)
const cartReducer = (state, action) =>{
  switch (action.type){
    case "ADD-CART" : 
      return{
        items:state.items.concat(action.item), //기존의 배열에서 액션에서 받아온 아이템
        //concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환
        totalAmount: state.items.totalAmount + action.item.price * action.item.amount, 
      }
  }

  return defaultCartState;
}

//리듀서 초기화 정의(함수 작동하기 전 상태)
const defaultCartState = { //cartstate안에 items, totalAmount값 들어있는 형태
  items:[],
  totalAmount: 0, 
}

const CartProvider = (props) => {
  //여러개의 state상태를 한곳에서 관리하는것.useReducer(함수이름,초기값) 
  //리듀서의 반환값 const [cartstate,dispatch] 
  const [cartstate, dispatchCartAction] = useReducer(cartReducer,defaultCartState) 


  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type:"ADD-CART",
      item:item
    })
  };
  const removeItemFromCartHandler = (item) => {
    dispatchCartAction({
      type:"REMOVE-CART",
      id:id 
    })
  };
  
  //업데이트 될 객체 따로 만들어줌 - 계속 값이 변하는 부분
  const cartContext = {
    items:cartstate.items,
    totalAmount: cartstate.totalAmount, 
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