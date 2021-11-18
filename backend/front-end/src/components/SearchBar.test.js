import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from "./SearchBar";

test('renders text', () => {
  const { getByText } = render(
      <SearchBar />
  );

  expect(getByText(/search bar/)).toBeDefined();
});
