import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-confetti", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="confetti" />,
  };
});

describe('Game', () => {

    afterEach(() => {
        vi.resetModules(); // clears cached modules between tests
    });

    test('renders the cards with images', async () => {
        const { default: Game } = await import('./Game')
        render(<Game category='animals' />)
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
        const { default: Game } = await import('./Game')
        render(<Game category='animals' />)
        const cards = screen.getAllByRole('button')

        await user.click(cards[0])

        expect (cards[0].disabled).toBe(true)

    })

    test('reveals two matching cards', async () => {

        const user = userEvent.setup()
        const { default: Game } = await import('./Game')
        render(<Game category='fruits' />)
        
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

    test('handles replay after game win', async () => {

        vi.doMock('../cards', () => {
            return {
                cards: {
                    fruits: [
                        {
                            id: 1,
                            img: { url: "/images/game/fruits/apple.png", alt: "Apple" },
                            value: "apple",
                            isRevealed: true
                        },
                        {
                            id: 2,
                            img: { url: "/images/game/fruits/apple.png", alt: "Apple" },
                            value: "apple",
                            isRevealed: true
                        },
                        {
                            id: 3,
                            img: { url: "/images/game/fruits/apricot.png", alt: "Apricot" },
                            value: "apricot",
                            isRevealed: true
                        },
                        {
                            id: 4,
                            img: { url: "/images/game/fruits/apricot.png", alt: "Apricot" },
                            value: "apricot",
                            isRevealed: true
                        },
                        {
                            id: 5,
                            img: { url: "/images/game/fruits/grape.png", alt: "Grape" },
                            value: "grape",
                            isRevealed: true
                        },
                        {
                            id: 6,
                            img: { url: "/images/game/fruits/grape.png", alt: "Grape" },
                            value: "grape",
                            isRevealed: true
                        },
                        {
                            id: 7,
                            img: { url: "/images/game/fruits/melon.png", alt: "Melon" },
                            value: "melon",
                            isRevealed: true
                        },
                        {
                            id: 8,
                            img: { url: "/images/game/fruits/melon.png", alt: "Melon" },
                            value: "melon",
                            isRevealed: true
                        },
                        {
                            id: 9,
                            img: { url: "/images/game/fruits/orange.png", alt: "Orange" },
                            value: "orange",
                            isRevealed: true
                        },
                        {
                            id: 10,
                            img: { url: "/images/game/fruits/orange.png", alt: "Orange" },
                            value: "orange",
                            isRevealed: true
                        },
                        {
                            id: 11,
                            img: { url: "/images/game/fruits/peach.png", alt: "Peach" },
                            value: "peach",
                            isRevealed: true
                        },
                        {
                            id: 12,
                            img: { url: "/images/game/fruits/peach.png", alt: "Peach" },
                            value: "peach",
                            isRevealed: true
                        },
                        {
                            id: 13,
                            img: { url: "/images/game/fruits/pineapple.png", alt: "Pineapple" },
                            value: "pineapple",
                            isRevealed: true
                        },
                        {
                            id: 14,
                            img: { url: "/images/game/fruits/pineapple.png", alt: "Pineapple" },
                            value: "pineapple",
                            isRevealed: true
                        },
                        {
                            id: 15,
                            img: { url: "/images/game/fruits/strawberry.png", alt: "Strawberry" },
                            value: "strawberry",
                            isRevealed: true
                        },
                        {
                            id: 16,
                            img: { url: "/images/game/fruits/strawberry.png", alt: "Strawberry" },
                            value: "strawberry",
                            isRevealed: true
                        }
                    ]
                }
            }
        })  

        const user = userEvent.setup()

        const { default: Game } = await import('./Game')
        render(<Game category='fruits' />)

        const buttonsArr = screen.getAllByRole('button')
        expect(buttonsArr).toHaveLength(18)

        const playAgainBtn = screen.getByText('Play again')
        expect(playAgainBtn).toBeInTheDocument();

        await user.click(playAgainBtn)

        const cards = screen.getAllByRole('button')
        expect(cards).toHaveLength(16)
        cards.forEach(el => expect(el.className).toBe('card'))

    })

})