import React from 'react';
import PropTypes from 'prop-types';
import DateFilter from './DateFilter';
import LookupFilter from './LookupFilter';
import DefaultFilter from './DefaultFilter';
import BooleanFilter from './BooleanFilter';
import Filter from './Filter';
import { TableCell, TableRow } from '@material-ui/core';

/**
 * MTableFilterRow is the row that is shown when `MaterialTable.options.filtering` is true.
 * This component allows you to provide a custom filtering algo or allow/disallow filtering for a column.
 */
export default function MTableFilterRow(props) {
  function getComponentForColumn(columnDef) {
    if (columnDef.filtering === false) {
      return null;
    }
    if (columnDef.field || columnDef.customFilterAndSearch) {
      if (columnDef.filterComponent) {
        return <Filter columnDef={columnDef} {...props} />;
      } else if (columnDef.lookup) {
        return <LookupFilter columnDef={columnDef} {...props} />;
      } else if (columnDef.type === 'boolean') {
        return <BooleanFilter columnDef={columnDef} {...props} />;
      } else if (['date', 'datetime', 'time'].includes(columnDef.type)) {
        return <DateFilter columnDef={columnDef} {...props} />;
      } else {
        return <DefaultFilter columnDef={columnDef} {...props} />;
      }
    }
  }

  function render() {
    const columns = props.columns
      .filter(
        (columnDef) =>
          !columnDef.hidden && !(columnDef.tableData.groupOrder > -1)
      )
      .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
      .map((columnDef) => (
        <TableCell
          key={columnDef.tableData.id}
          style={{
            ...props.filterCellStyle,
            ...columnDef.filterCellStyle,
          }}
        >
          {getComponentForColumn(columnDef)}
        </TableCell>
      ));

    if (props.selection) {
      columns.splice(
        0,
        0,
        <TableCell padding="none" key="key-selection-column" />
      );
    }

    if (props.hasActions) {
      if (props.actionsColumnIndex === -1) {
        columns.push(<TableCell key="key-action-column" />);
      } else {
        let endPos = 0;
        if (props.selection) {
          endPos = 1;
        }
        columns.splice(
          props.actionsColumnIndex + endPos,
          0,
          <TableCell key="key-action-column" />
        );
      }
    }

    if (props.hasDetailPanel) {
      const alignment = props.detailPanelColumnAlignment;
      const index = alignment === 'left' ? 0 : columns.length;
      columns.splice(
        index,
        0,
        <TableCell padding="none" key="key-detail-panel-column" />
      );
    }

    if (props.isTreeData > 0) {
      columns.splice(
        0,
        0,
        <TableCell padding="none" key={'key-tree-data-filter'} />
      );
    }

    props.columns
      .filter((columnDef) => columnDef.tableData.groupOrder > -1)
      .forEach((columnDef) => {
        columns.splice(
          0,
          0,
          <TableCell
            padding="checkbox"
            key={'key-group-filter' + columnDef.tableData.id}
          />
        );
      });

    return (
      <TableRow style={{ height: 10, ...props.filterRowStyle }}>
        {columns}
      </TableRow>
    );
  }

  //____________________________________________
  return render();
}

MTableFilterRow.defaultProps = {
  columns: [],
  detailPanelColumnAlignment: 'left',
  selection: false,
  hasActions: false,
  localization: {
    filterTooltip: 'Filter',
  },
  hideFilterIcons: false,
};

MTableFilterRow.propTypes = {
  columns: PropTypes.array.isRequired,
  hasDetailPanel: PropTypes.bool.isRequired,
  detailPanelColumnAlignment: PropTypes.string,
  isTreeData: PropTypes.bool.isRequired,
  onFilterChanged: PropTypes.func.isRequired,
  filterCellStyle: PropTypes.object,
  filterRowStyle: PropTypes.object,
  selection: PropTypes.bool.isRequired,
  actionsColumnIndex: PropTypes.number,
  hasActions: PropTypes.bool,
  localization: PropTypes.object,
  hideFilterIcons: PropTypes.bool,
};
