import React from 'react';
import { render } from '../common/test-utils'
import SideBar from "./SideBar";
import filters from '../filters.json'

test('side bar renders filters', () => {
  const { container } = render(
      <SideBar filters={filters} />
  );

  const cards = container.firstChild.getElementsByClassName('MuiPaper-root')
  expect(cards.length).toBe(Object.keys(filters).length)

});
