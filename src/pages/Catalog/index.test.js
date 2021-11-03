import React from "react";
import { render, screen } from "@testing-library/react";
import Catalog from "./index";
import {shallow} from 'enzyme';

describe('Catalog', () => {
  it('Shallow rendering', () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();
    //Accessing react lifecyle methods
    componentInstance.componentDidMount();

    //Accessing component state
    expect(wrapper.state('search')).toEqual('');

    // expect(componentInstance.counter(1)).toEqual(2);
  });

  it('Update search query', () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();
    const query = {
      'target': {
        'value': 'test query'
      }
    }
    componentInstance.updateSearchQuery(query)
    expect(wrapper.state('search')).toEqual('test query');
  });

  it('search empty query', () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();
    const query = {
      'target': {
        'value': ''
      }
    }
    componentInstance.updateSearchQuery(query)
    expect(wrapper.state('search')).toEqual('');
  });

  it('submit search query', () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.submitSearchQuery()
    expect(wrapper.state('search')).toEqual('');
  });

  it('handles check price', () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    const prevState = wrapper.state('isPrice1')
    componentInstance.handleCheckPrice(0)
    expect(wrapper.state('isPrice1')).toBe(!prevState);
  });
});
