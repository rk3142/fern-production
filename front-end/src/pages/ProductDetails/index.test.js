import React from "react";
import ProductDetails from "./index";
import {shallow} from 'enzyme';
import apiMock from "../ApiMock";

describe('Product details', () => {
    it('Shallow rendering', async () => {
        localStorage.setItem('recently_clicked', JSON.stringify(apiMock()[0]))
        // console.log(apiMock()[0])
        // console.log(JSON.parse(localStorage.getItem('recently_clicked')))
        const wrapper = shallow(<ProductDetails/>);
        const componentInstance = wrapper.instance();
        await componentInstance.componentDidMount();
        expect(wrapper.state('calculated_stats')).toStrictEqual([3, 2, 1])
    });
})