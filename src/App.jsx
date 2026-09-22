import { useState, useEffect } from 'react'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import SignUp from './components/SignUp'

function CounterContent() {
  const [count, setCount] = useState(0)
  const { user, logout } = useAuth()

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)

  return (
    <div className="container">
      <div className="header-bar">
        <div className="user-info">
          <span>Welcome, {user.name}!</span>
        </div>
        <button onClick={logout} className="btn btn-logout">
          Logout
        </button>
      </div>
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
    </div>
  )
}

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return isLogin ? (
    <Login onSwitchToSignup={() => setIsLogin(false)} />
  ) : (
    <SignUp onSwitchToLogin={() => setIsLogin(true)} />
  )
}

function App() {
  const [authLoading, setAuthLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse saved user:', error)
      }
    }
    setAuthLoading(false)
  }, [])

  if (authLoading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <AuthProvider>
      {user ? <CounterContent /> : <AuthPage />}
    </AuthProvider>
  )
}

export default App
