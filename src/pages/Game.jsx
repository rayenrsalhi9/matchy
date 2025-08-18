import { useState, useEffect } from "react"
import { cards } from "../cards"
import clsx from "clsx"
import ReactConfetti from "react-confetti"

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
                disabled={guess.includes(el) || el.isRevealed}
            >
                <div className="card-face front">
                    <img 
                        src={el.img.url} 
                        alt={el.img.alt} 
                        className="card-img" 
                        loading="lazy"
                    />
                </div>
                <div className="card-face back"></div>
            </button>
        )
    })

    const isGameWon = cardItems.every(el => el.isRevealed)

    useEffect(() => {

        const twoCardsGuessed = guess.length === 2

        if (twoCardsGuessed) {

            const isGuessCorrect = guess[0].value === guess[1].value

            if (isGuessCorrect) {
                setCardItems(prev => prev.map(el => {
                    return guess.includes(el) ?
                    {...el, isRevealed: !el.isRevealed} : el
                }))
            }

            setTimeout(() => {
                setGuess([])
            }, 1000)
        }
    }, [guess])

    function flipCard(el) {
        setGuess(prev => [...prev, el])
    }

    function playAgain() {
        setCardItems(prev => prev.map(el => ({...el, isRevealed: false})))
        setGuess([])
    }

    return (
        <section className="game">
            <div className="cards-container">
                { cardsEl }
            </div>
            {
                isGameWon ? <ReactConfetti /> : null
            }
            {
                isGameWon ? (
                    <button className="play-again-btn" onClick={playAgain}>
                        Play again
                    </button> 
                ) : null
            }
        </section>
    )
}
