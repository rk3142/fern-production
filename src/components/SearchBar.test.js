import React from 'react';
import { render, screen, fireEvent } from '../common/test-utils'
import SearchBar from "./SearchBar";
import {MemoryRouter} from "react-router-dom";

test('set search term', () => {
    const {container} = render(
        <MemoryRouter>
            <SearchBar />
        </MemoryRouter>
    )
    const input = container.getElementsByClassName('MuiInputBase-input')[0]
    fireEvent.change(input, { target: { value: 'test' } })
    expect(screen.getByDisplayValue('test') === input).toBeTruthy()
});

test('submit search', () => {
    const {container} = render(
        <MemoryRouter>
            <SearchBar />
        </MemoryRouter>
    )
    const form = container.getElementsByClassName('MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 css-1921d17-MuiPaper-root')[0]
    fireEvent.submit(form)
});
