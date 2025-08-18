import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Game from './Game'

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

})