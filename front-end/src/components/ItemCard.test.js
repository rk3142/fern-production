import React from 'react';
import apiMock from "../common/ApiMock";
import { render, fireEvent, screen } from '../common/test-utils'
import ItemCard from "./ItemCard";

const props = apiMock()[0]
const props2 = apiMock()[1]

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));


describe('item card', () => {
    test('go to details page', () => {
        const {container} = render(<ItemCard item={props} />)
        const card = container.firstChild.getElementsByClassName('MuiCardContent-root')[0]
        fireEvent.click(card)
        expect(mockHistoryPush).toHaveBeenCalledWith('/productdetails');
    });

    test('go to external link', () => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
          value: {
            href: props['link']
          }
        });
        const {container} = render(<ItemCard item={props} />)
        const linkIcon = container.firstChild.getElementsByClassName('MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root')[1]
        fireEvent.click(linkIcon)
        expect(window.location.href).toBe(props['link'])
    });

    test('hover state change', () => {
        const {container} = render(<ItemCard item={props2} />)
        const saveIcon = container.firstChild.getElementsByClassName('MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root')[0]
        fireEvent.mouseEnter(saveIcon)
        expect(screen.getByTestId('BookmarkIcon')).toBeInTheDocument()
    });

    test('click state change', () => {
        const {container} = render(<ItemCard item={props} />)
        const saveIcon = container.firstChild.getElementsByClassName('MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root')[0]
        fireEvent.click(saveIcon)
        expect(screen.getByTestId('BookmarkBorderIcon')).toBeInTheDocument()
    });

    test('hover + click state change', () => {
        const {container} = render(<ItemCard item={props2} />)
        const saveIcon = container.firstChild.getElementsByClassName('MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root')[0]
        fireEvent.mouseEnter(saveIcon)
        fireEvent.click(saveIcon)
        expect(screen.getByTestId('BookmarkIcon')).toBeInTheDocument()
    });
})
