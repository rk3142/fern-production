import React from 'react';
import {useHistory} from "react-router-dom";
import {authenticateAccess} from './utils'
import axios from 'axios';
import {signIn} from "../api";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('axios');

jest.mock('../api', () => ({
    signIn: () => (Promise.resolve())
}))

describe('authenticating access', () => {
    const history = useHistory()

    test('success setup', () => {
        localStorage.setItem('auth_token', 'testToken')
        axios.get.mockResolvedValue();
        authenticateAccess(history, '/catalog')
    });

    test('success', () => {
        localStorage.setItem('auth_token', 'testToken')
        authenticateAccess(history, '/catalog')
        expect(mockHistoryPush).toHaveBeenCalledWith('/catalog');
    });

    test('fails', () => {
        localStorage.clear()
        authenticateAccess(history, '/catalog')
        expect(mockHistoryPush).toHaveBeenCalledWith('/auth');
    });
})
