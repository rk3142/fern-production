import React from 'react';
import apiMock from "../common/ApiMock";
import { render, fireEvent, screen } from '../common/test-utils'
import SimilarItemCard from "./SimilarItemCard";

const props = apiMock()[0]

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));


describe('similar item card', () => {
    test('go to details page on click', () => {
        const {container} = render(<SimilarItemCard item={props} />)
        const card = container.firstChild.getElementsByClassName('MuiCardContent-root')[0]
        fireEvent.click(card)
        expect(mockHistoryPush).toHaveBeenCalledWith('/productdetails');
    });
})
