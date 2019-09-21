import React from 'react';
import MTableCell from '../src/components/m-table-cell';
import renderer from 'react-test-renderer';
import { defaultProps } from '../src/default-props';

const passedDefaultProps = { icons: defaultProps.icons };
const testDate = new Date('1991-09-23T10:00:00.000Z');

test.each([
	['boolean', true, { type: 'boolean' }, passedDefaultProps],
	['date', testDate, { type: 'date' }],
	['datetime', testDate, { type: 'datetime' }],
	['time', testDate, { type: 'time' }],
	[
		'currency',
		100,
		{
			type: 'currency',
			currencyCode: 'GBP',
			currencySetting: { locale: 'en-UK' },
			locale: 'en-UK',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		},
	],
	['generic', 'abc'],
	['empty', undefined, { emptyValue: '' }],
])('MTableCell can render %p cell', (_name, value, columnDef = {}, props = {}) => {
	const tree = renderer.create(<MTableCell columnDef={columnDef} value={value} {...props} />);
	expect(tree.toJSON()).toMatchSnapshot();
});
