import React from "react";
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

  it('handles check price 0', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    const prevState = wrapper.state('isPrice1')
    await componentInstance.handleCheckPrice(0)
    expect(wrapper.state('isPrice1')).toBe(!prevState);
  });

  it('handles check price 10', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    const prevState = wrapper.state('isPrice2')
    await componentInstance.handleCheckPrice(10)
    expect(wrapper.state('isPrice2')).toBe(!prevState);
  });

  it('handles check price 15', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    const prevState = wrapper.state('isPrice3')
    await componentInstance.handleCheckPrice(15)
    expect(wrapper.state('isPrice3')).toBe(!prevState);
  });

  it('handles check price 20', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    const prevState = wrapper.state('isPrice4')
    await componentInstance.handleCheckPrice(20)
    expect(wrapper.state('isPrice4')).toBe(!prevState);
  });

  it('handles check ratings 2', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    const prevState = wrapper.state('isRating1')
    await componentInstance.handleCheckRating(2)
    expect(wrapper.state('isRating1')).toBe(!prevState);
  });

  it('handles check ratings 3', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    const prevState = wrapper.state('isRating2')
    await componentInstance.handleCheckRating(3)
    expect(wrapper.state('isRating2')).toBe(!prevState);
  });

  it('handles check ratings 4', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    const prevState = wrapper.state('isRating3')
    await componentInstance.handleCheckRating(4)
    expect(wrapper.state('isRating3')).toBe(!prevState);
  });

  it('deletes from cart', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();
    componentInstance.setState({cart: [0]})

    await componentInstance.addToCart(0)
    expect(wrapper.state('cart').length).toBe(0);
  });

  it('adds to cart', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    await componentInstance.addToCart(0)
    expect(wrapper.state('cart').includes(0)).toBeTruthy();
  });

  it('clicks logo', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.handleSearch = jest.fn()
    wrapper.find('.Logo').props().onClick()
    expect(componentInstance.handleSearch).toHaveBeenCalled();
  });

  it('clicks name', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.handleSearch = jest.fn()
    wrapper.find('.Fern').props().onClick()
    expect(componentInstance.handleSearch).toHaveBeenCalled();
  });

  it('updates query in search bar', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.updateSearchQuery = jest.fn()
    wrapper.find('input.SearchBar').props().onChange()
    expect(componentInstance.updateSearchQuery).toHaveBeenCalled();
  });

  it('searches in search bar', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.handleSearch = jest.fn()
    wrapper.find('input.SearchBar').props().onSubmit()
    expect(componentInstance.handleSearch).toHaveBeenCalled();
  });

  it('searches with search btn press', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.handleSearch = jest.fn()
    wrapper.find('.SearchButton').props().onClick()
    expect(componentInstance.handleSearch).toHaveBeenCalled();
  });

  it('filters price 0', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.handleCheckPrice = jest.fn()
    wrapper.find('#price0').props().onChange()
    expect(componentInstance.handleCheckPrice).toHaveBeenCalled();
  });

  it('filters price 10', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.handleCheckPrice = jest.fn()
    wrapper.find('#price10').props().onChange()
    expect(componentInstance.handleCheckPrice).toHaveBeenCalled();
  });

  it('filters price 15', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.handleCheckPrice = jest.fn()
    wrapper.find('#price15').props().onChange()
    expect(componentInstance.handleCheckPrice).toHaveBeenCalled();
  });

  it('filters price 20', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.handleCheckPrice = jest.fn()
    wrapper.find('#price20').props().onChange()
    expect(componentInstance.handleCheckPrice).toHaveBeenCalled();
  });

  it('filters rating 2', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.handleCheckRating = jest.fn()
    wrapper.find('#rating2').props().onChange()
    expect(componentInstance.handleCheckRating).toHaveBeenCalled();
  });

  it('filters rating 3', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.handleCheckRating = jest.fn()
    wrapper.find('#rating3').props().onChange()
    expect(componentInstance.handleCheckRating).toHaveBeenCalled();
  });

  it('filters rating 4', async () => {
    const wrapper = shallow(<Catalog />);
    const componentInstance = wrapper.instance();

    componentInstance.handleCheckRating = jest.fn()
    wrapper.find('#rating4').props().onChange()
    expect(componentInstance.handleCheckRating).toHaveBeenCalled();
  });
});
