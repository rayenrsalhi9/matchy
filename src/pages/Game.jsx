import { useState, useEffect, useRef } from "react"
import { cards } from "../cards"

import clsx from "clsx"
import ReactConfetti from "react-confetti"

export default function Game({category}) {

    const [cardItems, setCardItems] = useState(() => shuffleCards(cards[category]))
    const [guess, setGuess] = useState([])
    const playAgainBtnRef = useRef(null)

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
                aria-label={`card number ${el.id}`}
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

    useEffect(() => {
        isGameWon ? playAgainBtnRef.current.focus() : null
    }, [isGameWon])

    function flipCard(el) {
        setGuess(prev => [...prev, el])
    }

    function playAgain() {
        setCardItems((prev) => shuffleCards(prev.map(el => ({...el, isRevealed: false}))))
        setGuess([])
    }

    function shuffleCards(cards) {
        // Create a copy of the array to avoid mutating the original
        const shuffled = [...cards];
        
        // Fisher-Yates shuffle algorithm
        for (let i = shuffled.length - 1; i > 0; i--) {
            // Generate random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements at i and j
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled;
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
                    <>
                    <button 
                        className="play-again-btn" 
                        ref={playAgainBtnRef}
                        onClick={playAgain} 
                        aria-label='congratulations! you won the game! click to play again.'
                        aria-live="assertive"
                    >
                        Play again
                    </button> 
                    </>
                ) : null
            }
        </section>
    )
}
