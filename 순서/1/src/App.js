import { Fragment } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Modal from './components/UI/Modal';

function App() {
  return (
    <Fragment>
      <Modal />
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
