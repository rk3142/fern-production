import React from "react";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen, waitFor } from '../../common/test-utils'
import UserProfile from "./index";
import {BASE_URL} from "../../api";

export const handlers = [
  rest.get(BASE_URL + '/user/kSlylzoV8KbTbvSFLUjHxjc1qbo1', (req, res, ctx) => {
    return res(ctx.json({
        'user': {
            'first_name': 'testUser',
            'current_spore_count': 0
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
//
//     it('plant tree', async () => {
//         const alertMock = jest.spyOn(window,'alert').mockImplementation()
//         const {container} = await render(<UserProfile />)
//         const plantBtn = await container.firstChild.getElementsByClassName('details__info__more__actions__buttons-spend')[0]
//         fireEvent.click(plantBtn)
//         expect(alertMock).toHaveBeenCalled()
//     });
//
//     it('collect trash', async () => {
//         const alertMock = jest.spyOn(window,'alert').mockImplementation()
//         const {container} = render(<UserProfile />)
//         const plantBtn = await container.firstChild.getElementsByClassName('details__info__more__actions__buttons-spend')[1]
//         fireEvent.click(plantBtn)
//         expect(alertMock).toHaveBeenCalled()
//     });
//
//     it('collect carbon', async () => {
//         const alertMock = jest.spyOn(window,'alert').mockImplementation()
//         const {container} = render(<UserProfile />)
//         const plantBtn = await container.firstChild.getElementsByClassName('details__info__more__actions__buttons-spend')[2]
//         fireEvent.click(plantBtn)
//         expect(alertMock).toHaveBeenCalled()
//     });
//
//     it('renders history', async () => {
//         localStorage.setItem('history', JSON.stringify([{'details': 'test'}]))
//         const {getByText} = render(<UserProfile />)
//         expect(getByText('test')).toBeTruthy()
//     });
//
//     it('click verify', async () => {
//         const {container, getByText} = render(<UserProfile />)
//         const verifyBtn = await container.firstChild.getElementsByClassName('user_page_btn')[0]
//         fireEvent.click(verifyBtn)
//         expect(getByText('Upload')).toBeTruthy()
//     });
//
//     it('click upload', async () => {
//         const alertMock = jest.spyOn(window,'alert').mockImplementation()
//         const {container} = render(<UserProfile />)
//         const verifyBtn = await container.firstChild.getElementsByClassName('user_page_btn')[0]
//         fireEvent.click(verifyBtn)
//         const uploadBtn = await container.firstChild.getElementsByClassName('user_page_btn')[0]
//         fireEvent.click(uploadBtn)
//         expect(alertMock).toHaveBeenCalled()
//     });
})