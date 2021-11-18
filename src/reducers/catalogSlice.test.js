import reducer, {addFilter, removeFilter, filterProducts} from "./catalogSlice";
import apiMock from "../common/ApiMock";

const mockFilter = {title: 'Price', label: 'Up to $10.00'}
const mockFilterRating = {title: 'Rating', label: '3'}


describe('catalog slice', () => {
    test('add filter', () => {
        const previousState = {currentFilter: []}
        expect(reducer(previousState, addFilter(mockFilter))).toEqual({
            currentFilter:
                [{
                    [mockFilter.title]: mockFilter.label
                }]
        })
    })

    test('remove filter', () => {
        const previousState = {currentFilter: [{[mockFilter.title]: mockFilter.label}]}
        expect(reducer(previousState, removeFilter(mockFilter))).toEqual({
            currentFilter: []
        })
    })

    test('no filter', () => {
        const previousState = {
            currentFilter: [],
            products: ['test'],
            filteredProducts: ['test']
        }
        expect(reducer(previousState, filterProducts())).toEqual({
            currentFilter: [],
            products: ['test'],
            filteredProducts: ['test']
        })
    })

    test('filter price', () => {
        const previousState = {
            currentFilter: [{[mockFilter.title]: mockFilter.label}],
            products: [apiMock()[0]],
            filteredProducts: []
        }
        expect(reducer(previousState, filterProducts())).toEqual({
            currentFilter: [{[mockFilter.title]: mockFilter.label}],
            products: [apiMock()[0]],
            filteredProducts: [apiMock()[0]]
        })
    })

    test('filter rating', () => {
        const previousState = {
            currentFilter: [{[mockFilterRating.title]: mockFilterRating.label}],
            products: [apiMock()[0]],
            filteredProducts: []
        }
        expect(reducer(previousState, filterProducts())).toEqual({
            currentFilter: [{[mockFilterRating.title]: mockFilterRating.label}],
            products: [apiMock()[0]],
            filteredProducts: [apiMock()[0]]
        })
    })
})