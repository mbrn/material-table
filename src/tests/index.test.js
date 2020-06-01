import * as React from 'react';
import { render, screen } from '@testing-library/react';
import MaterialTable from '../index';
import '@testing-library/jest-dom';
import { getData, getColumns } from './test_utils';

describe('The table renders without errors', () => {
    it('renders the empty table', () => {
        render(<MaterialTable />);

        // Checks for table body        
        expect(screen.getAllByRole('table')).toHaveLength(2);

        // Header
        expect(screen.getByRole('heading', { name: "Table Title" })).toBeInTheDocument();

        // Searchbar
        expect(screen.getByRole('textbox', { name: /search/i })).toBeInTheDocument();

        // Rows
        expect(screen.getAllByRole('rowgroup')).toHaveLength(3);
        expect(screen.getAllByRole('row')).toHaveLength(3);
        expect(screen.getByRole('row', { name: '' })).toBeInTheDocument();
        expect(screen.getByRole('row', { name: 'No records to display' })).toBeInTheDocument();
        expect(screen.getByRole('row', { name: '5 rows First Page Previous Page 1-0 of 0 Next Page Last Page' })).toBeInTheDocument();

        // Pagination
        expect(screen.getByText('0-0 of 0')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Rows per page/i })).toBeInTheDocument();
    });
    it('renders the table with empty columns and data', () => {
        render(<MaterialTable data={[]} columns={[]} />);

        // Checks for table body        
        expect(screen.getAllByRole('table')).toHaveLength(2);

        // Header
        expect(screen.getByRole('heading', { name: "Table Title" })).toBeInTheDocument();

        // Searchbar
        expect(screen.getByRole('textbox', { name: /search/i })).toBeInTheDocument();

        // Rows
        expect(screen.getAllByRole('rowgroup')).toHaveLength(3);
        expect(screen.getAllByRole('row')).toHaveLength(3);
        expect(screen.getByRole('row', { name: '' })).toBeInTheDocument();
        expect(screen.getByRole('row', { name: 'No records to display' })).toBeInTheDocument();
        expect(screen.getByRole('row', { name: '5 rows First Page Previous Page 1-0 of 0 Next Page Last Page' })).toBeInTheDocument();

        // Pagination
        expect(screen.getByText('0-0 of 0')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Rows per page/i })).toBeInTheDocument();
    });

    it('renders the rows with columns', () => {
        render(<MaterialTable data={getData()} columns={getColumns()} />);

        expect(screen.getAllByRole('rowgroup')).toHaveLength(3);
        expect(screen.getAllByRole('row')).toHaveLength(8);

        expect(screen.getAllByRole('columnheader')).toHaveLength(7);

        expect(screen.getByRole('row', { name: 'Name Birthcity Age Birthyear Birthdate Money Is available' })).toBeInTheDocument();
        expect(screen.getByRole('row', { name: 'Baran Istanbul 30 1/1/1970 1/1/1970, 01:00:00 $500.00' })).toBeInTheDocument();
        expect(screen.getByRole('row', { name: 'Dominik Aachen 26 11/11/2020 11/11/2020, 01:00:00 $0.00' })).toBeInTheDocument();

    });
});