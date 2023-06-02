//모달 팝업창
import React from 'react'
import classes from './Modal.module.css'
import { createPortal } from 'react-dom'
//import ReactDOM from 'react-dom' 이렇게 사용해서
//{ReactDOM.createPortal(<Backdrop />, portalElement)} 이렇게 사용 가능

//모달뒤 까만 반투명
const Backdrop=()=>{
  return <div className={classes.backdrop}> </div>
}

//실제 모달(가운데 하얀네모)
const ModalOverlay=(props)=>{
  return (
    <div className={classes.modal}>
      <div>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById('overlays');

//메인 컴포넌트
const Modal = (props) => {
  return (
    <div>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal( <ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </div>
  )
}

export default Modal
//ReactDOM.createPortal(child, container)