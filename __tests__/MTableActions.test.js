import React from 'react';
import MaterialTable from '../src';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

test('TODO - MAKE TESTS', () => {
  expect(true).toBe(true);
});
