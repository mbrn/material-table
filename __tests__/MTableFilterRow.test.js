import React from 'react';
import MaterialTable from '../src';
import { TEST_DATA, COLUMNS } from './utils';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

test('MaterialTable mounts successfully', () => {
  const wrapper = mount(
    <div>
      <MaterialTable data={TEST_DATA} columns={COLUMNS} />
    </div>
  );
  const el = wrapper.find('#material-----table');
  expect(Boolean(el)).toBe(true);
});
