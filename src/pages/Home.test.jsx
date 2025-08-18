import { describe, test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import Home from './Home'

describe('Home', () => {

    test('renders the game title', () => {
        render(<Home />)
        expect(screen.getByText('MatchyMatch')).toBeInTheDocument()
    })

    test('renders the game description', () => {
        render(<Home />)
        expect(screen.getByRole('paragraph')).toBeInTheDocument()
    })

    test('renders the background image', () => {
        render(<Home />)
        expect(screen.getByAltText('brain icon')).toBeInTheDocument()
    })

    test('renders the play game button', () => {
        render(<Home />)
        expect(screen.getByText('Start game')).toBeInTheDocument()
    })

})