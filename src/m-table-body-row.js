/* eslint-disable no-unused-vars */
import { Checkbox, TableCell, TableRow, IconButton, Icon, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */


export default class MTableBodyRow extends React.Component {
  renderColumns() {
    const mapArr = this.props.columns.filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .map((columnDef) => {
        const value = this.props.getFieldValue(this.props.data, columnDef);
        return (
          <this.props.components.Cell
            icons={this.props.icons}
            columnDef={columnDef}
            value={value}
            key={columnDef.tableData.id}
            rowData={this.props.data}
          />
        );
      });
    return mapArr;
  }

  renderActions() {
    return (
      <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} key="key-actions-column">
        <div style={{ display: 'flex' }}>
          <this.props.components.Actions data={this.props.data} actions={this.props.actions.filter(a => !a.isFreeAction && !this.props.options.selection)} />
        </div>
      </TableCell>
    );
  }
  renderSelectionColumn() {
    return (
      <TableCell padding="none" key="key-selection-column">
        <Checkbox
          checked={this.props.data.tableData.checked === true}
          onClick={(e) => e.stopPropagation()}
          value={this.props.data.tableData.id}
          onChange={(event) => this.props.onRowSelected(event, this.props.path)}
        />
      </TableCell>
    );
  }

  renderDetailPanelColumn() {
    const rotateIconStyle = isOpen => ({
      transform: isOpen ? 'rotate(90deg)' : 'none'
    });
    const CustomIcon = ({ icon, style }) => typeof icon === "string" ? <Icon style={style}>{icon}</Icon> : React.createElement(icon, { style });

    if (typeof this.props.detailPanel == 'function') {
      return (
        <TableCell padding="none" key="key-detail-panel-column" style={{ width: 48, textAlign: 'center' }}>
          <IconButton
            style={{ transition: 'all ease 200ms', ...rotateIconStyle(this.props.data.tableData.showDetailPanel) }}
            onClick={(event) => {
              this.props.onToggleDetailPanel(this.props.path, this.props.detailPanel);
              event.stopPropagation();
            }}
          >
            <this.props.icons.DetailPanel />
          </IconButton>
        </TableCell>
      );
    }
    else {
      return (
        <TableCell padding="none" key="key-detail-panel-column" style={{ width: 48 * this.props.detailPanel.length, textAlign: 'center' }}>
          {this.props.detailPanel.map((panel, index) => {
            const isOpen = this.props.data.tableData.showDetailPanel === panel.render;
            let iconButton = <this.props.icons.DetailPanel />;
            let animation = true;
            if (isOpen) {
              if (panel.openIcon) {
                iconButton = <CustomIcon icon={panel.openIcon} />;
                animation = false;
              }
              else if (panel.icon) {
                iconButton = <CustomIcon icon={panel.icon} />;
              }
            }
            else if (panel.icon) {
              iconButton = <CustomIcon icon={panel.icon} />;
              animation = false;
            }

            iconButton = (
              <IconButton
                key={"key-detail-panel-" + index}
                style={{ transition: 'all ease 200ms', ...rotateIconStyle(animation && isOpen) }}
                onClick={(event) => {
                  this.props.onToggleDetailPanel(this.props.path, panel.render);
                  event.stopPropagation();
                }}
              >
                {iconButton}
              </IconButton>);

            if (panel.tooltip) {
              iconButton = <Tooltip key={"key-detail-panel-" + index} title={panel.tooltip}>{iconButton}</Tooltip>;
            }

            return iconButton;
          })}
        </TableCell>
      );
    }
  }

  getStyle() {
    if (!this.props.options.rowStyle) {
      return {
        cursor: this.props.onRowClick ? 'pointer' : ''
      };
    }

    let style = this.props.options.rowStyle;
    if (typeof this.props.options.rowStyle === "function") {
      style = this.props.options.rowStyle(this.props.data);
    }

    return style;
  }

  render() {
    const columns = this.renderColumns();
    if (this.props.options.selection) {
      columns.splice(0, 0, this.renderSelectionColumn());
    }
    if (this.props.actions && this.props.actions.filter(a => !a.isFreeAction && !this.props.options.selection).length > 0) {
      if (this.props.options.actionsColumnIndex === -1) {
        columns.push(this.renderActions());
      } else if (this.props.options.actionsColumnIndex >= 0) {
        let endPos = 0;
        if (this.props.options.selection) {
          endPos = 1;
        }
        columns.splice(this.props.options.actionsColumnIndex + endPos, 0, this.renderActions());
      }
    }

    // Lastly we add detail panel icon
    if (this.props.detailPanel) {
      columns.splice(0, 0, this.renderDetailPanelColumn());
    }

    this.props.columns
      .filter(columnDef => columnDef.tableData.groupOrder > -1)
      .forEach(columnDef => {
        columns.splice(0, 0, <TableCell padding="none" key={"key-group-cell" + columnDef.tableData.id}/>);
      });

    return (
      <>
        <TableRow
          selected={this.props.index % 2 === 0}
          hover={this.props.onRowClick ? true : false}
          style={this.getStyle()}
          onClick={(event) => {            
            this.props.onRowClick && this.props.onRowClick(event, this.props.data, 
              (panelIndex) => {
                let panel = this.props.detailPanel;
                if(Array.isArray(panel)) {
                  panel = panel[panelIndex || 0].render;
                }
                  
                this.props.onToggleDetailPanel(this.props.path, panel);
              });
            }
          }
        >
          {columns}
        </TableRow>
        {this.props.data.tableData.showDetailPanel &&
          <TableRow selected={this.props.index % 2 === 0}>
            <TableCell colSpan={columns.length} padding="none">
              {this.props.data.tableData.showDetailPanel(this.props.data)}
            </TableCell>
          </TableRow>
        }
      </>
    );
  }
}

MTableBodyRow.defaultProps = {
  actions: [],
  index: 0,
  data: {},
  options: {},
  path: []
};

MTableBodyRow.propTypes = {
  actions: PropTypes.array,
  icons: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  detailPanel: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),
  options: PropTypes.object.isRequired,
  onRowSelected: PropTypes.func,
  path: PropTypes.arrayOf(PropTypes.number),
  getFieldValue: PropTypes.func.isRequired,
  columns: PropTypes.array,
  onToggleDetailPanel: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
};
