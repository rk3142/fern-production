import React from "react";
import Layout from "./Layout";
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

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
})