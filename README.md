# Memory Match — React App

A small classic **memory card matching game** built with React 18 and Vite.

## What it does

- A 4×4 board of 16 face-down cards containing 8 emoji pairs
- Click any card to flip it; click a second to see if it matches
- Matched pairs stay face-up and turn green; mismatches flip back after a short delay
- Tracks **moves**, **time** (mm:ss), and **pairs found**
- A win banner appears when all 8 pairs are matched
- "🔄 New Game" button reshuffles the deck and resets the stats

## Stack

- React 18 + Vite 5
- Plain CSS with 3D card flip animations (`rotateY` on `.card-back` / `.card-front`)
- No external state libraries — all state lives in `useState` hooks inside `App.jsx`

## Project structure

```
.
├── index.html              # Vite entry, mounts #root
├── package.json            # name: memory-react-app
├── vite.config.js          # @vitejs/plugin-react
└── src/
    ├── main.jsx            # ReactDOM.createRoot + StrictMode
    ├── App.jsx             # Game logic, deck shuffle, match handling
    └── index.css           # Gradient background, grid board, card flip, win banner
```

## Run / build

- `npm install`
- `npm run dev` — start the dev server
- `npm run build` — produce a production build in `dist/`
- `npm run preview` — preview the production build locally
