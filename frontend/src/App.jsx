import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-12 text-center">
        <div className="flex items-center justify-center gap-6">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1 className="mt-8 text-4xl font-bold tracking-tight">Vite + React + Tailwind</h1>

        <div className="card mt-8">
          <button
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-400/50"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
          <p className="mt-4 text-slate-300">
            Edit <code className="font-mono text-indigo-300">src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <p className="read-the-docs mt-10 text-sm text-slate-400">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
