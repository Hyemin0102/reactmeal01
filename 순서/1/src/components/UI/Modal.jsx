//모달 팝업창
import React from 'react'
import classes from './Modal.module.css'

//모달뒤 까만 반투명
const Backdrop=()=>{
  return <div className={classes.backdrop}> </div>
}

//실제 모달(가운데 하얀네모)
const ModalOverlay=(props)=>{
  return (
    <div className={classes.modal}>
      <div>{props.children}모달입니다</div>
    </div>
  )
}

//메인 컴포넌트
const Modal = (props) => {
  return (
    <div>
      <Backdrop />
      <ModalOverlay>{props.children}</ModalOverlay>
    </div>
  )
}

export default Modal