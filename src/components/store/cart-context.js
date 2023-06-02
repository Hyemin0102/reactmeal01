import React from "react";
//컨텍스트 선언만 해주는 용도

//컨텍스트 만듦, 컨텍스트 안에 데이타가 있음, 초기값은 초기화
const CartContext = React.createContext({
  //장바구니 항목 초기값
  items: [], //아이템이 들어있는 배열
  totalAmount: 0, //총 금액
  addItem: (item) => {}, //item을 받아와서 item 전체 추가하는 함수
  removeItem: (id) => {}, //id받아와서 해당 id 전체 삭제하는 함수
});

export default CartContext;
