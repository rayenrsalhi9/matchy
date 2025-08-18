import { useState } from "react"
import Home from "./pages/Home"

export default function App() {
  const [isHome, setIsHome] = useState(true)

  return (
    <main>
      {
        isHome ? <Home /> : null
      }
    </main>
  )
}
