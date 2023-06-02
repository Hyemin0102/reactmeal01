import { useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/store/CartProvider";

function App() {
  const [cartInShow, setCartInShow] = useState(false);
  //cart 모달 창 보여짐 상태관리

  //cart 모달 보이게 하는 함수
  const showCartHandler = () => {
    setCartInShow(true);
  };
  //cart 모달 안보이게 하는 함수
  const hideCartHandler = () => {
    setCartInShow(false);
  };
  return (
    <CartProvider>
      {/* 컨텍스트 영향 미치는 구역 지정. 함수형 컴포넌트식 */}
      {cartInShow && <Cart onClose={hideCartHandler} />}{" "}
      {/* cartInShow가 true면 카트 보여지게 */}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
