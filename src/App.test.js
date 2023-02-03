import React from "react";
import moment from "moment";

import { shallow } from "enzyme";
import { render, fireEvent } from '@testing-library/react';
import CurrentCard from "./components/CurrentCard";
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

import Search from './components/Search';





Enzyme.configure({ adapter: new Adapter() });

// navigator.geolocation.getCurrentPosition is not working in the test environment,
// so mock the geolocation function and provide a fake implementation

global.navigator.geolocation = {
  getCurrentPosition: jest.fn().mockImplementation((success) => {
    let fakeData = {
      coords: {
        latitude: 37.7749,
        longitude: -122.4194
      }
    };
    success(fakeData);
  })
};


// homepage testing
describe("CurrentCard component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CurrentCard />);
  });

  it('renders the component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders the loading message', () => {
    expect(wrapper.find('h1').text()).toEqual('Loading Data');
  });



},)


// search component

describe('Search component', () => {
  let wrapper;

  let searchLoad, searchRes;

  beforeEach(() => {


    wrapper = shallow(<Search />);
    searchLoad = true;
    searchRes = { city: 'New York' };

  });

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update the state on input change', () => {
    const { getByPlaceholderText } = render(<Search />);
    const cityInput = getByPlaceholderText('City');
    fireEvent.change(cityInput, { target: { value: 'San Francisco' } });
    expect(cityInput.value).toBe('San Francisco');

    const stateInput = getByPlaceholderText('State');
    fireEvent.change(stateInput, { target: { value: 'California' } });
    expect(stateInput.value).toBe('California');
  });

  it('calls the API on form submit', async () => {
    const mockJsonPromise = Promise.resolve({});
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(global.fetch).toHaveBeenCalled();
    await expect(mockFetchPromise).resolves.toBeDefined();
  });

})
