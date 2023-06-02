import React, { useReducer } from 'react';
import CartContext from './cart-context';

//리듀서 함수 정의(상태, 액션 파라미터 필요)
const cartReducer = (state, action) =>{
  //console.log(state.items) //defaultCartState에 할당받은 items,totalAmount 나옴
  if(action.type === "ADD-CART"){
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    //findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환
    //state.items 기존의 각각 item의 id와 action으로 보내준 item의 id가 같은것이 있는지 확인
    const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex]
    //console.log('기존',existingCartItemIndex) 몇번째로 있는지 숫자 나옴
    //console.log('기존',existingCartItem) 배열 전체 나옴, 기존아이템 없으면 undefined

    //추가한 아이템이 기존에 있는 아이템일 경우
    let updatedItems;
    if(existingCartItem){
      //기존 아이템 전체 복사하고, 그 중 기존 amount + 새로 추가한 amount
      const updatedItem = {...existingCartItem, amount:existingCartItem.amount + action.item.amount}
      //console.log('updatedItem',updatedItem) //기존 배열+새로 추가한 배열 합쳐서 새로운 배열로 만들어진것나옴 그냥 객체 타입
      updatedItems = [...state.items] //기존 객체를 새 배열로 넣어서 업데이트, updatedItems = state.items.concat(action.item); 같은 의미
      //console.log('updatedItems',updatedItems) 
      updatedItems[existingCartItemIndex] = updatedItem; //값을 더해준 기존 아이템 업데이트

    }else{ //기존에 아이템 없는 경우
      updatedItems = state.items.concat(action.item);
    }

    return{
      items:updatedItems,
      totalAmount:updatedTotalAmount,
    }
  }
  if(action.type === "REMOVE-CART"){
    const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.id);
    const existingCartItem = state.items[existingCartItemIndex]
    
    //총 합계에서 내가 고른 아이템의 가격 빼줌
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    
    let updatedItems;
    
    //1 인 상태에서 빼주면 완전히 사라져야함
    if(existingCartItem.amount === 1){ 
      updatedItems = state.items.filter((item)=>item.id !== action.id);
    }else{
      const updatedItem = {...existingCartItem, amount:existingCartItem.amount -1}
      updatedItems = [...state.items] //기존 객체를 새 배열로 넣어서 업데이트
      updatedItems[existingCartItemIndex] = updatedItem; //값을 빼준 기존 아이템 업데이트
    }
    return{
      items:updatedItems,
      totalAmount:updatedTotalAmount,
    }
  }
}
  /* switch (action.type){
    case "ADD-CART" : 
      return{
        items:state.items.concat(action.item), //기존의 배열에서 액션에서 받아온 아이템
        //concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환
        totalAmount: state.totalAmount + action.item.price * action.item.amount, 
        //addItemToCartHandler함수에서 보내는 각 item 배열 하나의 price와 amount, amount는 mealItem에서 onAddToCart라는 프롭스를 MealItemForm으로 보냈고, MealItemForm에서 input의 onSubmit 프롭스를 함수로 받으면서 onAddToCart 프롭스를 받음. 그리고 onAddToCart의 인자를 수량으로 보냈고, mealItem에서 addTocartHandler함수의 인자(수량)를 amount로 받아옴. 
        //그렇게 amount에 값 할당
      }
    case "REMOVE-CART" :
      return defaultCartState;
  } */


//리듀서 초기화 정의(함수 작동하기 전 상태)
const defaultCartState = { //cartstate안에 items, totalAmount값 들어있는 형태
  items:[], //이 아이템 배열은 addItem에 들어있는 amount,price,name,id임.addItem은 cartContext의 값 중 하나이며, addItemToCartHandler함수에 할당받음. addItemToCartHandler는 들어있는 배열 각각의 요소를 item으로 받아와서 cartReducer에 액션으로 보냄. 
  totalAmount: 0, 
}

const CartProvider = (props) => {
  //여러개의 state상태를 한곳에서 관리하는것.useReducer(함수이름,초기값) 
  //리듀서의 반환값 const [cartstate,dispatch] 
  const [cartstate, dispatchCartAction] = useReducer(cartReducer,defaultCartState) 


  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type:"ADD-CART",
      item:item//여기서 보내는 item안에는 amount,price,name,id 값이 있음.
    })
  };
  const removeItemFromCartHandler = (id) => {
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
  //console.log(cartContext)  //업데이트 확인
  return (
    <CartContext.Provider value={cartContext}>
      {/* 생성한 CartContext에 provider 붙혀줌.
      value는 CartContext 선언한거 그대로 가져오면 초기화 상태기때문에 업데이트될 객체 따로 만듦*/}
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;