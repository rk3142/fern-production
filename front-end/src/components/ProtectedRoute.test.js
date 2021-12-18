import React from "react";
import { render, screen } from '../common/test-utils'
import ProtectedRoute from "./ProtectedRoute";
import {MemoryRouter} from "react-router-dom";

function Welcome() {
  return <h1 data-testid={'test'}>Hello</h1>;
}

describe('protected route', () => {
    test('unauthorized access', () => {
        const {container} = render(
            <MemoryRouter>
                <ProtectedRoute component={<><h1 data-testid={'test'}>Test</h1></>} />
            </MemoryRouter>
        )

        expect(container.querySelectorAll('div').length).toEqual(0)
    })

    test('authorized access', () => {
        localStorage.setItem('auth_token', 'test_token')
        render(
            <MemoryRouter>
                <ProtectedRoute component={Welcome} />
            </MemoryRouter>
        )

        expect(screen.getByTestId('test')).toBeInTheDocument()
    })
})