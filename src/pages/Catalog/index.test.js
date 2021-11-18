import React from "react";
import Catalog from "./index";
import apiMock from "../../common/ApiMock";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen } from '../../common/test-utils'

export const handlers = [
  rest.get('https://fern-iteration-2.herokuapp.com/products', (req, res, ctx) => {
    return res(ctx.json({products: apiMock()}), ctx.delay(100))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

describe('Catalog', () => {
  it('Show catalog', async () => {
    render(<Catalog />);
    const myElement = await screen.findAllByText(/Generic/i)
    expect(myElement.length).toBe(apiMock().length)
  });

});
