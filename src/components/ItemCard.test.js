import React from 'react';
import {useHistory} from "react-router-dom";
import {authenticateAccess} from './utils'
import axios from 'axios';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('item card', () => {
    test('success setup', () => {

    });
})
