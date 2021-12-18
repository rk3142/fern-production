import React from "react";
import ProductDetails from "./index";
import apiMock from "../../common/ApiMock";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen } from '../../common/test-utils'
import {BASE_URL} from "../../api";
import {MemoryRouter} from "react-router-dom";

export const handlers = [
    rest.get(BASE_URL + '/products', (req, res, ctx) => {
        return res(ctx.json({products: apiMock()}), ctx.delay(100))
    }),
    rest.get(BASE_URL + '/products/' + apiMock()[0], (req, res, ctx) => {
        return res(ctx.json(apiMock()[0]), ctx.delay(100))
    }),
    rest.get(BASE_URL + '/product/similar', (req, res, ctx) => {
        return res(ctx.json(apiMock()[0]), ctx.delay(100))
    })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

describe('Product details', () => {
    it('renders', async () => {
        localStorage.setItem('recently_clicked', JSON.stringify(apiMock()[0]))
        render(
            <MemoryRouter>
                <ProductDetails />
            </MemoryRouter>
        )
        const itemTitle = await screen.findByText(/Generic/i)
        expect(itemTitle).toBeInTheDocument()
    });

    it('saves item', async () => {
        localStorage.setItem('recently_clicked', JSON.stringify(apiMock()[0]))
        const {container} = render(
            <MemoryRouter>
                <ProductDetails />
            </MemoryRouter>
        )
        const saveBtn = container.firstChild.getElementsByClassName('details__info__more__actions__buttons-save')[0]
        fireEvent.click(saveBtn)
        const unsaveBtn = await screen.findByText(/Unsave/i)
        expect(unsaveBtn).toBeInTheDocument()
    });

    it('unsaves item', async () => {
        localStorage.setItem('recently_clicked', JSON.stringify(apiMock()[0]))
        const {container} = render(
            <MemoryRouter>
                <ProductDetails />
            </MemoryRouter>
        )
        const saveBtn = container.firstChild.getElementsByClassName('details__info__more__actions__buttons-save')[0]
        fireEvent.click(saveBtn)

        const unsaveBtn = container.firstChild.getElementsByClassName('details__info__more__actions__buttons-unsave')[0]
        fireEvent.click(unsaveBtn)
        const saveText = await screen.findByText(/Save/i)
        expect(saveText).toBeInTheDocument()
    });

    it('go to link', async () => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
          value: {
            href: apiMock()[0]['link']
          }
        });

        localStorage.setItem('recently_clicked', JSON.stringify(apiMock()[0]))
        const {container} = render(
            <MemoryRouter>
                <ProductDetails />
            </MemoryRouter>
        )
        const buyBtn = container.firstChild.getElementsByClassName('details__info__more__actions__buttons-buy')[0]
        fireEvent.click(buyBtn)

        expect(window.location.href).toBe(apiMock()[0]['link'])
    });

    it('get similar products', async () => {
        // FIXME: wait until all similar products load
        localStorage.setItem('recently_clicked', JSON.stringify(apiMock()[0]))
        const {container} = await render(
            <MemoryRouter>
                <ProductDetails />
            </MemoryRouter>
        )
        const myElement = await screen.findAllByText(/Generic/i)

        expect(myElement.length).toBe(1)
    });
})