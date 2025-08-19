import { describe, test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import App from './App'
import userEvent from "@testing-library/user-event";

describe('App', () => {

    test('handles play game button click', async () => {

        const user = userEvent.setup()
        
        render(<App />)

        const playGameBtn = screen.getByRole('button')

        const categorySelect = screen.getByRole('combobox')
        await user.selectOptions(categorySelect, 'animals')

        await user.click(playGameBtn)

        const images = screen.getAllByRole('img')
        expect(images).toHaveLength(16)
    })

})