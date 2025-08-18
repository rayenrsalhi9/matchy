import { useState } from "react"
import { cards } from "../cards"

export default function Game() {

    const [cardItems, _] = useState(cards)

    const cardsEl = cardItems.map(el => (
        <button>
            <img src={el.img.url} alt={el.img.url} className="cardImg" />
        </button>
    ))

    return (
        <section className="game">
            <h1>Hello game!</h1>
            <div className="cards-container">
                { cardsEl }
            </div>
        </section>
    )
}
