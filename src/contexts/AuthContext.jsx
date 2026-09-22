import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse saved user:', error)
      }
    }
    setLoading(false)
  }, [])

  const signup = (email, password, name) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    if (existingUsers.some(u => u.email === email)) {
      throw new Error('Email already registered')
    }
    
    const newUser = { id: Date.now(), email, password, name }
    existingUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(existingUsers))
    
    const sessionUser = { id: newUser.id, email, name }
    setUser(sessionUser)
    localStorage.setItem('user', JSON.stringify(sessionUser))
    return sessionUser
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find(u => u.email === email && u.password === password)
    
    if (!foundUser) {
      throw new Error('Invalid email or password')
    }
    
    const sessionUser = { id: foundUser.id, email: foundUser.email, name: foundUser.name }
    setUser(sessionUser)
    localStorage.setItem('user', JSON.stringify(sessionUser))
    return sessionUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
