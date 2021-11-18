import React from "react";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen } from '../../common/test-utils'
import UserProfile from "./index";

export const handlers = [
  rest.get('/user/kSlylzoV8KbTbvSFLUjHxjc1qbo1', (req, res, ctx) => {
    return res(ctx.json({
        'data': {
            'user': {
                'first_name': 'testUser'
            },
            'current_spore_count': 1000
        }
    }), ctx.delay(100))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

describe('User profile', () => {
    it('renders', async () => {
        render(<UserProfile />)
        const hiText = await screen.findByText(/hi/i)
        expect(hiText).toBeInTheDocument()
    });

    it('plant tree', async () => {
        const alertMock = jest.spyOn(window,'alert').mockImplementation()
        const {container} = render(<UserProfile />)
        const plantBtn = container.firstChild.getElementsByClassName('details__info__more__actions__buttons-spend')[0]
        fireEvent.click(plantBtn)
        expect(alertMock).toHaveBeenCalled()
    });

    it('collect trash', async () => {
        const alertMock = jest.spyOn(window,'alert').mockImplementation()
        const {container} = render(<UserProfile />)
        const plantBtn = container.firstChild.getElementsByClassName('details__info__more__actions__buttons-spend')[1]
        fireEvent.click(plantBtn)
        expect(alertMock).toHaveBeenCalled()
    });

    it('collect carbon', async () => {
        const alertMock = jest.spyOn(window,'alert').mockImplementation()
        const {container} = render(<UserProfile />)
        const plantBtn = container.firstChild.getElementsByClassName('details__info__more__actions__buttons-spend')[2]
        fireEvent.click(plantBtn)
        expect(alertMock).toHaveBeenCalled()
    });
})