import { useState } from "react"
import Home from "./pages/Home"
import Game from "./pages/Game"

export default function App() {
  const [isHome, setIsHome] = useState(true)

  return (
    <main>
      {
        isHome ? <Home setIsHome={setIsHome} /> : <Game />
      }
    </main>
  )
}
