import React from 'react';
import { render, fireEvent, screen } from '../common/test-utils'
import filters from '../filters.json'
import SideBarCard from "./SideBarCard";

const props = {
    title: 'Price',
    filter: filters['Price']['filter']
}

test('side bar card click filter', () => {
  const { container } = render(
      <SideBarCard title={props.title} filter={props.filter} />
  );

  const checkBox = container.firstChild.getElementsByClassName('MuiFormControlLabel-root')[0];
  fireEvent.click(checkBox)
  expect(screen.getByTestId('CheckBoxIcon')).toBeInTheDocument()
});

test('side bar card click filter', () => {
  const { container } = render(
      <SideBarCard title={props.title} filter={props.filter} />
  );

  const checkBox = container.firstChild.getElementsByClassName('MuiFormControlLabel-root')[0];
  fireEvent.click(checkBox)
  fireEvent.click(checkBox)
  expect(screen.getAllByTestId('CheckBoxOutlineBlankIcon')[0]).toBeInTheDocument()
});
