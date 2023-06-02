import React, { useRef } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
  const amountInputRef = useRef(); //특정 DOM선택, ref를 통해서 입력된 값 받아옴(입력한 수량 알아오기 위해)

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    //console.log(enteredAmount); //문자열로 나옴
    const enteredAmountNumber = +enteredAmount //숫자로 변환 = const enteredAmountNumber = Number(enteredAmount)
    
    //유효성검사
    if(enteredAmount.trim().length===0 || enteredAmount<1 || enteredAmount>5){ 
      return;
      //trim으로 공백자른 다음 길이가 0일때, 즉 아무것도 없을 때 or 1보다 작거나 or 5보다 클때 그냥 빠져나옴. 작동 안함.
    }
    props.onAddToCart(enteredAmountNumber); //수량을 onAddToCart에 인자로 보냄
  }



  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input label="Amount" ref={amountInputRef} /* props-ref 의미 but 여기서 ref대신 aa 써주면 forwardRef 사용 안하고 넘길수도 있음 */
        input={{
          id:"amount_"+props.id,
          type:"number",
          min:"1",
          max:"5",
          defaultValue:"1",
          step:"1",
    }} />
    
      <button>+ Add</button>
    </form>
  )
}

export default MealItemForm