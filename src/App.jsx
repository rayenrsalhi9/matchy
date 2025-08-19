import { useState } from "react"
import Home from "./pages/Home"
import Game from "./pages/Game"

export default function App() {
  const [isHome, setIsHome] = useState(true)
  const [category, setCategory] = useState('')

  return (
    <main>
      {
        isHome ? 
        <Home setIsHome={setIsHome} setCategory={setCategory} category={category} /> : 
        <Game category={category} setIsHome={setIsHome} />
      }
    </main>
  )
}
