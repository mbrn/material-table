/* eslint-disable no-unused-vars */
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */


export default class MTableFooter extends React.Component {
  renderColumns() {
    const size = this.getElementSize();
    const mapArr = this.props.columns.filter(columnDef => !columnDef.hidden)
      .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
      .map((columnDef, index) => {
        const value = this.props.getFieldValue(this.props.data, columnDef);
        return (
          <this.props.components.Cell
            size={size}
            columnDef={columnDef}
            value={value}
            style={this.getStyle()}
            key={"footer-cell-" + columnDef.tableData.id}
            rowData={this.props.data}
            isFooterCell={true}
          />
        );
      });
    return mapArr;
  }

  getStyle() {
    let style = {
      transition: 'all ease 300ms',
      position: 'sticky',
      bottom: '-1px',
      zIndex: 4,
      backgroundColor: 'whitesmoke'
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

  getElementSize = () => {
    return this.props.options.padding === 'default' ? 'medium' : 'small';
  }

  renderActionPlaceholders() {
    const size = this.getElementSize();
    const baseIconSize = size === 'medium' ? 42 : 26;
    const actions = this.props.actions.filter(a => !a.isFreeAction && !this.props.options.selection);
    return (
      <TableCell 
        size={size} 
        padding="none" 
        key="footer-actions-column-placeholder" 
        style={{ width: baseIconSize * actions.length, padding: '0px 5px' }}
      >
      </TableCell>
    );
  }

  renderSelectionColumnPlaceholder() {
    const size = this.getElementSize();
    const baseIconSize = size === 'medium' ? 42 : 26;

    return (
      <TableCell 
        size={this.getElementSize()} 
        padding="none" 
        key="footer-key-selection-column-placeholder" 
        style={{ width: baseIconSize + 9 * (this.props.treeDataMaxLevel - 1) }}
      />
    );
  }

  render() {
    const renderColumns = this.renderColumns();
    
    // 
    // Add placeholder columns
    //

    if (this.props.options.selection) {
      renderColumns.splice(0, 0, this.renderSelectionColumnPlaceholder());
    }
    if (this.props.actions && this.props.actions.filter(a => !a.isFreeAction && !this.props.options.selection).length > 0) {
      if (this.props.options.actionsColumnIndex === -1) {
        renderColumns.push(this.renderActionPlaceholders());
      } else if (this.props.options.actionsColumnIndex >= 0) {
        let endPos = 0;
        if (this.props.options.selection) {
          endPos = 1;
        }
        renderColumns.splice(this.props.options.actionsColumnIndex + endPos, 0, this.renderActionPlaceholders());
      }
    }

    if(this.props.isTreeData){
      renderColumns.splice(0, 0, 
        <TableCell style={this.getStyle()} padding="none" key={"footer-tree-data-placeholder"} />
      );
    }
    if(this.props.detailPanel){
      if (this.props.options.detailPanelColumnAlignment === 'right') {
        renderColumns.push(
          <TableCell 
            size={this.getElementSize()} 
            padding="none" 
            key="footer-detail-panel-placeholder" 
            style={{ width: 42, textAlign: 'center' }}
          />
        );
      } else {
        renderColumns.splice(0, 0, 
          <TableCell 
            size={this.getElementSize()} 
            padding="none" 
            key="footer-detail-panel-placeholder" 
            style={{ width: 42, textAlign: 'center' }}
          />
        );
      }
    }
    this.props.columns
      .filter(columnDef => columnDef.tableData.groupOrder > -1)
      .forEach(columnDef => {
        renderColumns.splice(0, 0, <TableCell size={this.getElementSize()} padding="none" key={"key-group-cell-placeholder-" +   columnDef.tableData.id} />);
      });
    //
    // End placeholders
    //
    const {
      data,
      treeDataMaxLevel,
      isTreeData,
      columns,
      components,
      getFieldValue,
      onRowClick,
      options,
      ...rowProps } = this.props;
    return (
      <>
        <TableFooter style={this.getStyle()}>
            <TableRow
              {...rowProps}
              hover={onRowClick ? true : false}
              style={this.getStyle()}
              onClick={(event) => {
                onRowClick && onRowClick(event, this.props.data);
              }}
            >
              {renderColumns}
            </TableRow>
        </TableFooter>
      </>
    );
  }
}

MTableFooter.defaultProps = {
  options: {},
};

MTableFooter.propTypes = {
  options: PropTypes.object.isRequired,
  columns: PropTypes.array,
  components: PropTypes.object,
  onRowClick: PropTypes.func,
  getFieldValue: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
