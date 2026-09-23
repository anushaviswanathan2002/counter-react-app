import { useState } from 'react'
import './App.css'
import Stopwatch from './components/Stopwatch'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)

  return (
    <div className="container">
      <div className="counter-card">
        <h1>Counter App</h1>
        <div className="counter-display">{count}</div>
        <div className="button-group">
          <button onClick={decrement} className="btn btn-minus">
            −
          </button>
          <button onClick={reset} className="btn btn-reset">
            Reset
          </button>
          <button onClick={increment} className="btn btn-plus">
            +
          </button>
        </div>
      </div>
      <Stopwatch />
    </div>
  )
}

export default App
