import React from "react";
// import {shallow} from 'enzyme';
// import axios from "axios";
import apiMock from "../../common/ApiMock";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen } from '../../common/test-utils'
import Home from "./index";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const utils = require("../../common/utils");

describe('Home', () => {
  it('Click login', async () => {
    render(<Home />);
    const loginMock = jest.spyOn(utils, 'authenticateAccess')
    loginMock.mockImplementation(() => {
      return
    });

    fireEvent.click(screen.getByRole('button', {name: /Log In/i}))
    expect(loginMock).toBeCalled()
  });

});
