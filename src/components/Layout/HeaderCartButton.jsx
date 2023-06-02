import React, { useContext } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../store/cart-context'

const HeaderCartButton = (props) => { //HeaderCartButton에 CartContext 컨텍스트 전달
  const cartCtx = useContext(CartContext);
  //const numberOfCartItems = cartCtx.items.length; //items는 배열 전체
  //배열.reduce((합해진값,밸류)=>{합해진값 + 밸류}, 합해진값의 초기값)
  const numberOfCartItems = cartCtx.items.reduce( (sum,item) => {
    return sum + item.amount;
  },0) //item은 addItemToCartHandler에서 보내줌


  return (
    <button className={classes.button} onClick={props.onclick}>
      <span className={classes.icon}><CartIcon /></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton