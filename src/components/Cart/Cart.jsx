//모달팝업 안에 들어갈 내용
import React, { useContext } from 'react'
import classes from "./Cart.module.css"
import Modal from '../UI/Modal'
import CartContext from '../store/cart-context'

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;//장바구니에 항목이 있을 때
  const totalAmount =`$${cartCtx.totalAmount.toFixed(2)}`

  const cartItemRemoveHandler = (id) => { 
  //버튼 클릭 시 함수 작동하면서 값을 removeItemFromCartHandler 보냄 
    cartCtx.removeItem(id)
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1}) //클릭할때마다 amount 1로 추가되라고
  };


  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item)=>(
      <li key={item.id}> {/* 반복되는 아이템들 고유의 key값 가지고있어야함.콘솔 오류 */}
        <div>
        <h2>{item.name}</h2>
        <div>
          <span className={classes['price']}>{`$${item.price.toFixed(2)}`}</span>
          <span className={classes['amount']}>X{item.amount}</span>
        </div>
        </div>
        <div className={classes['itemNumber']}>
          <button onClick={()=>{cartItemRemoveHandler(item.id)}}>-</button>
          <button onClick={()=>{cartItemAddHandler(item)}}>+</button>
        </div>
      </li>
        
      ))}
    </ul>
  )

  return (
    <Modal onClose={props.onClose}>
    <div>
        {cartItems}
        <div className={classes.total}>
          <span>총 합계</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.action}>
          <button className={classes['button-outline']} onClick={props.onClose}>Close</button>
          {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </div>
    </Modal>
  )
}

export default Cart