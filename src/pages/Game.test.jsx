import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Game from './Game'
import userEvent from "@testing-library/user-event";

describe('Game', () => {

    test('renders the cards with images', () => {
        render(<Game />)
        const images = screen.getAllByRole('img')
        expect(images).toHaveLength(16)
        images.forEach(img => {
            expect(img.className).toBe('card-img')
            expect(img.src).toBeTruthy()
            expect(img.alt).toBeTruthy()
        })
    })

    test('flips a card', async () => {

        const user = userEvent.setup()
        render(<Game />)
        const cards = screen.getAllByRole('button')

        await user.click(cards[0])

        expect (cards[0].disabled).toBe(true)

    })

    test('reveals two matching cards', async () => {

        const user = userEvent.setup()
        render(<Game />)
        
        const images = screen.getAllByAltText('Apple')
        expect(images).toHaveLength(2)

        const card1 = images[0]
        const card2 = images[1]

        await user.click(card1)
        await user.click(card2)

        const cards = screen.getAllByRole('button')
        const revealedCards = cards.filter(el => el.disabled)

        expect(revealedCards[0].className).toBe('card revealed')
        expect(revealedCards[1].className).toBe('card revealed')

    })

})