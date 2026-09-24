import { useState, useEffect } from 'react'

const EMOJIS = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🚀', '🌟']

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function buildDeck() {
  const pairs = [...EMOJIS, ...EMOJIS]
  return shuffle(pairs).map((emoji, index) => ({
    id: index,
    emoji,
    flipped: false,
    matched: false,
  }))
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function App() {
  const [deck, setDeck] = useState(buildDeck)
  const [selected, setSelected] = useState([])
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(true)
  const [locked, setLocked] = useState(false)

  const matchedCount = deck.filter((c) => c.matched).length
  const won = matchedCount === deck.length

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (won) setRunning(false)
  }, [won])

  function handleCardClick(card) {
    if (locked || card.flipped || card.matched) return
    if (selected.length === 2) return

    const newDeck = deck.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    setDeck(newDeck)

    const newSelected = [...selected, card.id]
    setSelected(newSelected)

    if (newSelected.length === 2) {
      setMoves((m) => m + 1)
      setLocked(true)
      const [firstId, secondId] = newSelected
      const first = newDeck.find((c) => c.id === firstId)
      const second = newDeck.find((c) => c.id === secondId)

      if (first.emoji === second.emoji) {
        setTimeout(() => {
          setDeck((cur) =>
            cur.map((c) => (c.id === firstId || c.id === secondId ? { ...c, matched: true } : c))
          )
          setSelected([])
          setLocked(false)
        }, 500)
      } else {
        setTimeout(() => {
          setDeck((cur) =>
            cur.map((c) => (c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c))
          )
          setSelected([])
          setLocked(false)
        }, 900)
      }
    }
  }

  function restart() {
    setDeck(buildDeck())
    setSelected([])
    setMoves(0)
    setSeconds(0)
    setRunning(true)
    setLocked(false)
  }

  return (
    <div className="app">
      <h1>🧠 Memory Match</h1>
      <p className="subtitle">Flip two cards at a time and find all the matching pairs.</p>

      <div className="stats">
        <div className="stat">
          <div className="stat-label">Moves</div>
          <div className="stat-value">{moves}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Time</div>
          <div className="stat-value">{formatTime(seconds)}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Pairs</div>
          <div className="stat-value">{matchedCount / 2}/{EMOJIS.length}</div>
        </div>
      </div>

      {won && (
        <div className="win-banner">
          🎉 You matched them all in {moves} moves and {formatTime(seconds)}!
        </div>
      )}

      <div className="board">
        {deck.map((card) => (
          <button
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => handleCardClick(card)}
            aria-label={card.flipped || card.matched ? card.emoji : 'Hidden card'}
            disabled={card.matched}
          >
            <div className="card-face card-back">?</div>
            <div className="card-face card-front">{card.emoji}</div>
          </button>
        ))}
      </div>

      <button className="restart" onClick={restart}>
        🔄 New Game
      </button>
    </div>
  )
}
