import React from "react";
import ProductDetails from "./index";
import {shallow} from 'enzyme';

describe('Catalog', () => {
    it('Shallow rendering', () => {
        const wrapper = shallow(<ProductDetails/>);
        const componentInstance = wrapper.instance();
        expect(wrapper.state('date')).not.toBeNull()
    });
})