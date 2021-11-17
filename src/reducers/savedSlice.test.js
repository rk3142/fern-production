import reducer, {addSaved, removeSaved} from "./savedSlice";
import apiMock from "../common/ApiMock";

const mockFilter = {title: 'Price', label: 'Up to $10.00'}
const mockFilterRating = {title: 'Rating', label: '3'}


describe('catalog slice', () => {
    test('add saved', () => {
        const previousState = {saved: []}
        expect(reducer(previousState, addSaved(apiMock()[0]))).toEqual({
            saved:
                [apiMock()[0]]
        })
    })

    test('remove saved', () => {
        const previousState = {saved: [apiMock()[0]]}
        expect(reducer(previousState, removeSaved(apiMock()[0]))).toEqual({
            saved: []
        })
    })
})