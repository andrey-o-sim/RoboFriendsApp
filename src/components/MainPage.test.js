import React from 'react';

import { shallow } from 'enzyme';
import MainPage from './MainPage';
import CardList from './CardList';

let wrapper;
beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: false
    }
    wrapper = shallow(<MainPage {...mockProps} />);
});

it('renders MainPage without crashing', () => {
    expect(wrapper).toMatchSnapshot();
});

it('filters robots correctly', () => {
    const mockProps2 = {
        onRequestRobots: jest.fn(),
        robots: [
            {
                id: 3,
                name: 'John',
                email: 'Join@gmail.com'
            }
        ],
        searchField: 'John',
        isPending: false
    };

    const wrapper2 = shallow(<MainPage {...mockProps2} />);
    expect(wrapper.instance().filterRobots([])).toEqual([]);
    expect(wrapper2.instance().filterRobots([])).toEqual([{
        id: 3,
        name: 'John',
        email: 'Join@gmail.com'
    }]);
})


it('filters robots correctly 2', () => {
    const mockProps3 = {
        onRequestRobots: jest.fn(),
        robots: [
            {
                id: 3,
                name: 'John',
                email: 'Join@gmail.com'
            }
        ],
        searchField: 'a',
        isPending: false
    };

    const filterRobots = [];
    const wrapper3 = shallow(<MainPage {...mockProps3} />);
    expect(wrapper3.instance().filterRobots([])).toEqual(filterRobots);
});

it('check "isPending"', () => {
    const wrapper4 = shallow(<MainPage onRequestRobots={jest.fn()} isPending={true} />);
    expect(wrapper4.find('h1')).toHaveLength(1);
});

it('check "is not Pending"', () => {
    const mockProps5 = {
        onRequestRobots: jest.fn(),
        robots: [
            {
                id: 3,
                name: 'John',
                email: 'Join@gmail.com'
            }
        ],
        searchField: 'a',
        isPending: false
    };
    const wrapper5 = shallow(<MainPage {...mockProps5} />);
    expect(wrapper5.find(CardList)).toHaveLength(1);
});