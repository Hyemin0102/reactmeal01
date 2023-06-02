//모달팝업 안에 들어갈 내용
import React from 'react'
import classes from "./Cart.module.css"

const Cart = () => {
  return (
    <div className={classes['cart-items']}>
      <div>
        <span>총수량</span>
        <span>금액</span>
      </div>
      <div>
        <button>Close</button>
        <button>Order</button>
      </div>
    </div>
  )
}

export default Cart