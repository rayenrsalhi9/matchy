import { describe, test, expect, vi, afterEach } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-confetti", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="confetti" />,
  };
});

describe('App', () => {

    afterEach(() => {
        vi.resetModules()
    })

    test('handles play game button click', async () => {

        const user = userEvent.setup()
        
        const { default: App } = await import('./App')
        render(<App />)

        const playGameBtn = screen.getByRole('button')

        const categorySelect = screen.getByRole('combobox')
        await user.selectOptions(categorySelect, 'animals')

        await user.click(playGameBtn)

        const images = screen.getAllByRole('img')
        expect(images).toHaveLength(16)
    })

    test('handles main menu button click after win', async () => {

        vi.doMock('./cards', () => {
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

        const { default: App } = await import('./App')
        render(<App />)

        expect(screen.getByText('MatchyMatch')).toBeInTheDocument()

        const categorySelect = screen.getByRole('combobox')
        await user.selectOptions(categorySelect, 'fruits')

        await user.click(screen.getByText('Start game'))

        expect(screen.getByText('Play again')).toBeInTheDocument()
        expect(screen.getByText('Main menu')).toBeInTheDocument()

        await user.click(screen.getByText('Main menu'))

        expect(screen.getByText('MatchyMatch')).toBeInTheDocument()
        expect(screen.getByRole('paragraph')).toBeInTheDocument()
        expect(screen.getByRole('combobox')).toBeInTheDocument()
        expect(screen.getByText('Start game')).toBeInTheDocument()

    })

})