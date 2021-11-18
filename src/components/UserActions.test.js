import React from 'react';
import { render, fireEvent, screen } from '../common/test-utils'
import UserActions from "./UserActions";

const utils = require("../common/utils");
const authMock = jest.spyOn(utils, 'authenticateAccess')
authMock.mockImplementation(() => {
  return
});

describe('user actions', () => {
    test('go to saved page', () => {
        const {container} = render(<UserActions />)
        const bookmarkIcon = container.firstChild.getElementsByClassName('MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root')[0]
        fireEvent.click(bookmarkIcon)
        expect(authMock).toHaveBeenCalledWith(undefined, '/saved');
    });

    test('go to profile page', () => {
        const {container} = render(<UserActions />)
        const bookmarkIcon = container.firstChild.getElementsByClassName('MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root')[1]
        fireEvent.click(bookmarkIcon)
        expect(authMock).toHaveBeenCalledWith(undefined, '/profile');
    });

    test('logout', () => {
        const {container} = render(<UserActions />)
        const logoutIcon = container.firstChild.getElementsByClassName('MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root')[2]
        fireEvent.click(logoutIcon)
        expect(authMock).toHaveBeenCalledWith(undefined, '/catalog');
    });
})
