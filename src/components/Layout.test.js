import React from "react";
import Layout from "./Layout";
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '../common/test-utils'
import axios from "axios";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
jest.mock('axios');

describe('Layout', () => {
    it('Push login btn', () => {
        const { getByRole } = render(
          <MemoryRouter>
            <Layout />
          </MemoryRouter>,
        );

        fireEvent.click(getByRole('button'));
        expect(mockHistoryPush).toHaveBeenCalledWith('/auth');
    });

    it('Push login btn as authenticated user', () => {
        const { getByRole } = render(
          <MemoryRouter>
            <Layout />
          </MemoryRouter>,
        );

        localStorage.setItem("auth_token", "test token")

        fireEvent.click(getByRole('button'));
        expect(axios.post).toBeCalled();
    });

    it('Push login btn as authenticated user', () => {
        render(
          <MemoryRouter>
            <Layout authenticated={true} />
          </MemoryRouter>,
        );

        expect(screen.getByTestId('SearchIcon')).toBeInTheDocument();
    });
})