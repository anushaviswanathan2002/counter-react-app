import { useState, useEffect, useRef } from 'react'
import './Stopwatch.css'

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const millis = Math.floor((ms % 1000) / 10)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(2, '0')}`
}

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
  const startedAtRef = useRef(0)
  const baseRef = useRef(0)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const start = () => {
    if (running) return
    startedAtRef.current = Date.now()
    intervalRef.current = setInterval(() => {
      setElapsed(baseRef.current + (Date.now() - startedAtRef.current))
    }, 31)
    setRunning(true)
  }

  const pause = () => {
    if (!running) return
    baseRef.current = baseRef.current + (Date.now() - startedAtRef.current)
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setRunning(false)
  }

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
    baseRef.current = 0
    startedAtRef.current = 0
    setElapsed(0)
    setRunning(false)
  }

  const handleStartPause = () => {
    if (running) pause()
    else start()
  }

  return (
    <div className="stopwatch-card">
      <h2>⏱️ Stopwatch</h2>
      <div className="stopwatch-display">{formatTime(elapsed)}</div>
      <div className="stopwatch-buttons">
        <button
          onClick={handleStartPause}
          className={`stopwatch-btn ${running ? 'btn-pause' : 'btn-start'}`}
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} className="stopwatch-btn btn-reset-sw">
          Reset
        </button>
      </div>
    </div>
  )
}
