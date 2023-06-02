import React, { forwardRef } from 'react'
import classes from './Input.module.css'

//forwardRef 리액트 함수로 함수 부분 감싸서 사용해야 props ref 받아올수 있음.
//여기서 인자는 props, ref 둘 다 있어야함.
const Input = forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input}/>
    </div>
  )
})

export default Input