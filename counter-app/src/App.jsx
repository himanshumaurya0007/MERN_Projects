import { useState } from "react";
import './App.css';
import Modal from "./Modal";

function App() {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const increment = () => {
    setCount(count + 1);
  }

  const decrement = () => {
    setCount(count - 1);
  }

  const reset = () => {
    setShowModal(true); // Open the modal instead of resetting immediately
  };

  const confirmReset = () => {
    setCount(0);
    setShowModal(false);
  };

  const cancelReset = () => {
    setShowModal(false);
  };


  return (
    <>
      <div className="app">

        <h1>COUNTER APP</h1>

        <h2>{count}</h2>

        <div className="buttons">
          <button onClick={increment} id='btn-plus'>Increment</button>
          <button onClick={decrement} id='btn-minus'>Decrement</button>
          <button onClick={reset} id='btn-zero'>Reset</button>
        </div>

        {showModal && (
          <Modal
            message="You are about to reset the counter!! Are you sure?"
            onConfirm={confirmReset}
            onCancel={cancelReset}
          />
        )}
      </div>
    </>
  );
}

export default App;