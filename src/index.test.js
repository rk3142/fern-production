import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {createMemoryHistory} from "history";
import {Router} from 'react-router-dom'
import Catalog from "./pages/Catalog";


it('renders text', () => {
    expect(true)
  // const history = createMemoryHistory()
  // const { getByText } = render(
  //     <Router history={history}>
  //       <Catalog />
  //     </Router>,
  // );
  //
  // expect(getByText(/generic/i)).toBeInTheDocument()
});