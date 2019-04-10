/* eslint-disable no-unused-vars */
import { Checkbox, TableCell, TableRow, IconButton, Icon, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */


export default class MTableBodyRow extends React.Component {
  renderColumns() {
    const mapArr = this.props.columns.filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .map((columnDef, index) => {
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
    const actions = this.props.actions.filter(a => !a.isFreeAction && !this.props.options.selection);
    return (
      <TableCell padding="dense" key="key-actions-column" style={{ width: 48 * actions.length, padding: '0px 5px' }}>
        <div style={{ display: 'flex' }}>
          <this.props.components.Actions data={this.props.data} actions={actions} components={this.props.components} />
        </div>
      </TableCell>
    );
  }
  renderSelectionColumn() {
    return (
      <TableCell padding="none" key="key-selection-column" style={{ width: 48 }}>
        <Checkbox
          checked={this.props.data.tableData.checked === true}
          onClick={(e) => e.stopPropagation()}
          value={this.props.data.tableData.id.toString()}
          onChange={(event) => this.props.onRowSelected(event, this.props.path)}
          style={{
            paddingLeft: 12 + this.props.level * 20
          }}
        />
      </TableCell>
    );
  }

  rotateIconStyle = isOpen => ({
    transform: isOpen ? 'rotate(90deg)' : 'none'
  });

  renderDetailPanelColumn() {

    const CustomIcon = ({ icon, style }) => typeof icon === "string" ? <Icon style={style}>{icon}</Icon> : React.createElement(icon, { style });

    if (typeof this.props.detailPanel == 'function') {
      return (
        <TableCell padding="none" key="key-detail-panel-column" style={{ width: 48, textAlign: 'center' }}>
          <IconButton
            style={{ transition: 'all ease 200ms', ...this.rotateIconStyle(this.props.data.tableData.showDetailPanel) }}
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

            if (typeof panel === "function") {
              panel = panel(this.props.data);
            }

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
                style={{ transition: 'all ease 200ms', ...this.rotateIconStyle(animation && isOpen) }}
                disabled={panel.disabled}
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
    let style = {
      transition: 'all ease 300ms',
    };

    if (typeof this.props.options.rowStyle === "function") {
      style = {
        ...style,
        ...this.props.options.rowStyle(this.props.data)
      };
    }
    else if(this.props.options.rowStyle) {
      style = {
        ...style,
        ...this.props.options.rowStyle
      };
    }

    if (this.props.onRowClick) {
      style.cursor = 'pointer';
    }

    if(this.props.hasAnyEditingRow) {
      style.opacity = 0.2;
    }

    return style;
  }

  render() {
    const renderColumns = this.renderColumns();
    if (this.props.options.selection) {
      renderColumns.splice(0, 0, this.renderSelectionColumn());
    }
    if (this.props.actions && this.props.actions.filter(a => !a.isFreeAction && !this.props.options.selection).length > 0) {
      if (this.props.options.actionsColumnIndex === -1) {
        renderColumns.push(this.renderActions());
      } else if (this.props.options.actionsColumnIndex >= 0) {
        let endPos = 0;
        if (this.props.options.selection) {
          endPos = 1;
        }
        renderColumns.splice(this.props.options.actionsColumnIndex + endPos, 0, this.renderActions());
      }
    }

    if (this.props.isTreeData) {
      if (this.props.data.tableData.childRows && this.props.data.tableData.childRows.length > 0) {
        renderColumns.splice(0, 0, (
          <TableCell padding="none" key={"key-tree-data-column"} style={{ width: 48 }}>
            <IconButton
              style={{
                transition: 'all ease 200ms',
                marginLeft: this.props.level * 20,
                ...this.rotateIconStyle(this.props.data.tableData.isTreeExpanded)
              }}
              onClick={(event) => {
                this.props.onTreeExpandChanged(this.props.path);
                event.stopPropagation();
              }}
            >
              <this.props.icons.DetailPanel />
            </IconButton>
          </TableCell>
        ));
      }
      else {
        renderColumns.splice(0, 0, <TableCell padding="none" key={"key-tree-data-column"} />);
      }
    }

    // Lastly we add detail panel icon
    if (this.props.detailPanel) {
      renderColumns.splice(0, 0, this.renderDetailPanelColumn());
    }

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
      detailPanel,
      getFieldValue,
      isTreeData,
      onRowClick,
      onRowSelected,
      onTreeExpandChanged,
      onToggleDetailPanel,
      onEditingCanceled,
      onEditingApproved,
      options,
      hasAnyEditingRow,
      ...rowProps } = this.props;

    return (
      <>
        <TableRow
          selected={hasAnyEditingRow}
          {...rowProps}
          hover={onRowClick ? true : false}
          style={this.getStyle()}
          onClick={(event) => {
            onRowClick && onRowClick(event, this.props.data,
              (panelIndex) => {
                let panel = detailPanel;
                if (Array.isArray(panel)) {
                  panel = panel[panelIndex || 0].render;
                }

                onToggleDetailPanel(this.props.path, panel);
              });
          }}
        >
          {renderColumns}
        </TableRow>
        {this.props.data.tableData.childRows && this.props.data.tableData.isTreeExpanded &&
          this.props.data.tableData.childRows.map((data, index) => {
            if (data.tableData.editing) {
              return (
                <this.props.components.EditRow
                  columns={this.props.columns.filter(columnDef => { return !columnDef.hidden })}
                  components={this.props.components}
                  data={data}
                  icons={this.props.icons}
                  localization={this.props.localization}
                  key={index}
                  mode={data.tableData.editing}
                  options={this.props.options}
                  isTreeData={this.props.isTreeData}
                  detailPanel={this.props.detailPanel}
                  onEditingCanceled={onEditingCanceled}
                  onEditingApproved={onEditingApproved}
                />
              );
            } else {
              return (
                <this.props.components.Row
                  {...this.props}
                  data={data}
                  index={index}
                  key={index}
                  level={this.props.level + 1}
                  path={[...this.props.path, index]}
                  onEditingCanceled={onEditingCanceled}
                  onEditingApproved={onEditingApproved}
                  hasAnyEditingRow={this.props.hasAnyEditingRow}
                />
              );
            }
          })
        }
        {this.props.data.tableData && this.props.data.tableData.showDetailPanel &&
          <TableRow
          // selected={this.props.index % 2 === 0}
          >
            <TableCell colSpan={renderColumns.length} padding="none">
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
  detailPanel: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func]))]),
  hasAnyEditingRow: PropTypes.bool,
  options: PropTypes.object.isRequired,
  onRowSelected: PropTypes.func,
  path: PropTypes.arrayOf(PropTypes.number),
  getFieldValue: PropTypes.func.isRequired,
  columns: PropTypes.array,
  onToggleDetailPanel: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  onEditingApproved: PropTypes.func,
  onEditingCanceled: PropTypes.func,
};
