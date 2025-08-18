import { useState } from "react"
import { cards } from "../cards"
import clsx from "clsx"

export default function Game() {

    const [cardItems, setCardItems] = useState(cards)
    const [guess, setGuess] = useState([])

    const cardsEl = cardItems.map(el => {

        const cardClassname = clsx({
            'card': true,
            'revealed': el.isRevealed || guess.includes(el)
        })

        return(
            <button 
                className={cardClassname} 
                key={el.id} 
                onClick={() => flipCard(el)}
            >
                <div className="card-face front">
                    <img 
                        src={el.img.url} 
                        alt={el.img.url} 
                        className="card-img" 
                        loading="lazy"
                    />
                </div>
                <div className="card-face back"></div>
            </button>
        )
    })

    function flipCard(el) {
        setGuess(prev => [...prev, el])
    }

    return (
        <section className="game">
            <div className="cards-container">
                { cardsEl }
            </div>
        </section>
    )
}
