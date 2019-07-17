/* eslint-disable no-unused-vars */
import { Checkbox, TableCell, TableRow, IconButton, Icon, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */


export default class MTableBodyFooterRow extends React.Component {
  renderColumns() {
    const mapArr = this.props.columns.filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
      .map((columnDef, index) => {
        const value = this.props.getFieldValue(this.props.data, columnDef);
        return (
          <this.props.components.Cell
            icons={this.props.icons}
            columnDef={columnDef}
            value={value}
            key={"cell-" + this.props.data.tableData.di + "-" + columnDef.tableData.id}
            rowData={this.props.data}
          />
        );
      });
    return mapArr;
  }

  getStyle() {
    let style = {
      transition: 'all ease 300ms',
    };

    if (typeof this.props.options.footerStyle === "function") {
      style = {
        ...style,
        ...this.props.options.footerStyle(this.props.data)
      };
    }
    else if (this.props.options.footerStyle) {
      style = {
        ...style,
        ...this.props.options.footerStyle
      };
    }

    if (this.props.onRowClick) {
      style.cursor = 'pointer';
    }

    return style;
  }

  render() {
    const renderColumns = this.renderColumns();

    this.props.columns
      .filter(columnDef => columnDef.tableData.groupOrder > -1)
      .forEach(columnDef => {
        renderColumns.splice(0, 0, <TableCell padding="none" key={"key-group-cell" + columnDef.tableData.id} />);
      });

    const {
      icons,
      data,
      columns,
      components,
      getFieldValue,
      onRowClick,
      onRowSelected,
      options,
      ...rowProps } = this.props;

    return (
      <>
        <TableRow
          {...rowProps}
          hover={onRowClick ? true : false}
          style={this.getStyle()}
          onClick={onRowClick}
        >
          {renderColumns}
        </TableRow>
        {this.props.data.tableData.childRows && this.props.data.tableData.isTreeExpanded &&
          this.props.data.tableData.childRows.map((data, index) => {
            
              return (
                <this.props.components.Row
                  {...this.props}
                  data={data}
                  index={index}
                  key={index}
                  level={this.props.level + 1}
                  path={[...this.props.path, index]}
                />
              );
            
          })
        }
      </>
    );
  }
}

MTableBodyFooterRow.defaultProps = {
  actions: [],
  index: 0,
  data: {},
  options: {},
  path: []
};

MTableBodyFooterRow.propTypes = {
  actions: PropTypes.array,
  icons: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  onRowSelected: PropTypes.func,
  path: PropTypes.arrayOf(PropTypes.number),
  getFieldValue: PropTypes.func.isRequired,
  columns: PropTypes.array,
  onRowClick: PropTypes.func,
};
