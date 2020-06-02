/* eslint-disable no-unused-vars */
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import * as React from 'react';
import * as CommonValues from '../utils/common-values';
/* eslint-enable no-unused-vars */


export default class MTableBodyRow extends React.Component {
  renderColumns() {
    const size = CommonValues.elementSize(this.props);
    const mapArr = this.props.columns.filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
      .map((columnDef, index) => {
        const value = this.props.getFieldValue(this.props.data, columnDef);
        return (
          <this.props.components.Cell
              size={size}
              icons={this.props.icons}
              columnDef={{ cellStyle: this.props.options.cellStyle, ...columnDef }}
              value={value}
              key={"cell-" + this.props.data.tableData.id + "-" + columnDef.tableData.id}
              rowData={this.props.data}
          />
        );
      });
    return mapArr;
  }

  renderActions() {
    const size = CommonValues.elementSize(this.props);
    const actions = CommonValues.rowActions(this.props);
    const width = actions.length * CommonValues.baseIconSize(this.props);
    return (
      <TableCell size={size} padding="none" key="key-actions-column" style={{ width: width, padding: '0px 5px', boxSizing: 'border-box', ...this.props.options.actionsCellStyle }}>
        <div style={{ display: 'flex' }}>
          <this.props.components.Actions data={this.props.data} actions={actions} components={this.props.components} size={size} disabled={this.props.hasAnyEditingRow} />
        </div>
      </TableCell>
    );
  }
  renderSelectionColumn() {
    let checkboxProps = this.props.options.selectionProps || {};
    if (typeof checkboxProps === 'function') {
      checkboxProps = checkboxProps(this.props.data);
    }

    const size = CommonValues.elementSize(this.props);
    const selectionWidth = CommonValues.selectionMaxWidth(this.props, this.props.treeDataMaxLevel);

    const styles = size === 'medium' ? {
      marginLeft: this.props.level * 9
    } : {
        padding: "4px",
        marginLeft: 5 + this.props.level * 9
      };

    return (
      <TableCell size={size} padding="none" key="key-selection-column" style={{ width: selectionWidth }}>
        <Checkbox
            size={size}
            checked={this.props.data.tableData.checked === true}
            onClick={(e) => e.stopPropagation()}
            value={this.props.data.tableData.id.toString()}
            onChange={(event) => this.props.onRowSelected(event, this.props.path, this.props.data)}
            style={styles}
            {...checkboxProps}
        />
      </TableCell>
    );
  }

  rotateIconStyle = isOpen => ({
    transform: isOpen ? 'rotate(90deg)' : 'none'
  });

  renderDetailPanelColumn() {
    const size = CommonValues.elementSize(this.props);
    const CustomIcon = ({ icon, iconProps }) => typeof icon === "string" ? <Icon {...iconProps}>{icon}</Icon> : React.createElement(icon, { ...iconProps });

    if (typeof this.props.detailPanel === 'function') {
      return (
        <TableCell size={size} padding="none" key="key-detail-panel-column" style={{ width: 42, textAlign: 'center' }}>
          <IconButton
              size={size}
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
        <TableCell size={size} padding="none" key="key-detail-panel-column">
          <div style={{ width: 42 * this.props.detailPanel.length, textAlign: 'center', display: 'flex' }}>
            {this.props.detailPanel.map((panel, index) => {

              if (typeof panel === "function") {
                panel = panel(this.props.data);
              }

              const isOpen = (this.props.data.tableData.showDetailPanel || '').toString() === panel.render.toString();

              let iconButton = <this.props.icons.DetailPanel />;
              let animation = true;
              if (isOpen) {
                if (panel.openIcon) {
                  iconButton = <CustomIcon icon={panel.openIcon} iconProps={panel.iconProps} />;
                  animation = false;
                }
                else if (panel.icon) {
                  iconButton = 
                    <CustomIcon icon={panel.icon} iconProps={panel.iconProps} />
                  ;
                }
              }
              else if (panel.icon) {
                iconButton = 
                  <CustomIcon icon={panel.icon} iconProps={panel.iconProps} />
                ;
                animation = false;
              }

              iconButton = 
                (<IconButton
                  size={size}
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
          </div>
        </TableCell>
      );
    }
  }

  renderTreeDataColumn() {
    const size = CommonValues.elementSize(this.props);
    if (this.props.data.tableData.childRows && this.props.data.tableData.childRows.length > 0) {
      return (
        <TableCell size={size} padding="none" key={"key-tree-data-column"} style={{ width: 48 + 9 * (this.props.treeDataMaxLevel - 2) }}>
          <IconButton
              size={size}
              style={{
              transition: 'all ease 200ms',
              marginLeft: this.props.level * 9,
              ...this.rotateIconStyle(this.props.data.tableData.isTreeExpanded)
            }}
              onClick={(event) => {
              this.props.onTreeExpandChanged(this.props.path, this.props.data);
              event.stopPropagation();
            }}
          >
            <this.props.icons.DetailPanel />
          </IconButton>
        </TableCell>
      );
    }
    else {
      return<TableCell padding="none" key={"key-tree-data-column"} />;
    }
  }

  getStyle(index, level) {
    let style = {
      transition: 'all ease 300ms'
    };

    if (typeof this.props.options.rowStyle === "function") {
      style = {
        ...style,
        ...this.props.options.rowStyle(this.props.data, index, level)
      };
    }
    else if (this.props.options.rowStyle) {
      style = {
        ...style,
        ...this.props.options.rowStyle
      };
    }

    if (this.props.onRowClick) {
      style.cursor = 'pointer';
    }

    if (this.props.hasAnyEditingRow) {
      style.opacity = 0.2;
    }

    return style;
  }

  render() {
    const size = CommonValues.elementSize(this.props);
    const renderColumns = this.renderColumns();
    if (this.props.options.selection) {
      renderColumns.splice(0, 0, this.renderSelectionColumn());
    }
    if (this.props.actions && this.props.actions.filter(a => a.position === "row" || typeof a === "function").length > 0) {
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

    // Then we add detail panel icon
    if (this.props.detailPanel) {
      if (this.props.options.detailPanelColumnAlignment === 'right') {
        renderColumns.push(this.renderDetailPanelColumn());
      } else {
        renderColumns.splice(0, 0, this.renderDetailPanelColumn());
      }
    }

    // Lastly we add tree data icon
    if (this.props.isTreeData) {
      renderColumns.splice(0, 0, this.renderTreeDataColumn());
    }

    this.props.columns
      .filter(columnDef => columnDef.tableData.groupOrder > -1)
      .forEach(columnDef => {
        renderColumns.splice(0, 0, <TableCell size={size} padding="none" key={"key-group-cell" + columnDef.tableData.id} />);
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
      treeDataMaxLevel,
      localization,
      actions,
      ...rowProps } = this.props;

    return (
      <>
        <TableRow
            selected={hasAnyEditingRow}
            {...rowProps}
            hover={onRowClick ? true : false}
            style={this.getStyle(this.props.index, this.props.level)}
            onClick={(event) => {
            onRowClick && onRowClick(event, this.props.data,
              (panelIndex) => {
                let panel = detailPanel;
                if (Array.isArray(panel)) {
                  panel = panel[panelIndex || 0];
                  if (typeof panel === "function") {
                    panel = panel(this.props.data);
                  }
                  panel = panel.render;
                }

                onToggleDetailPanel(this.props.path, panel);
              });
          }}
        >
          {renderColumns}
        </TableRow>
        {this.props.data.tableData && this.props.data.tableData.showDetailPanel &&
          <TableRow >
            <TableCell size={size} colSpan={renderColumns.length} padding="none">
              {this.props.data.tableData.showDetailPanel(this.props.data)}
            </TableCell>
          </TableRow>
        }
        {this.props.data.tableData.childRows && this.props.data.tableData.isTreeExpanded &&
          this.props.data.tableData.childRows.map((data, index) => {
            if (data.tableData.editing) {
              return (
                <this.props.components.EditRow
                    columns={this.props.columns.filter(columnDef => { return !columnDef.hidden; })}
                    components={this.props.components}
                    data={data}
                    icons={this.props.icons}
                    localization={this.props.localization}
                    getFieldValue={this.props.getFieldValue}
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
                    treeDataMaxLevel={treeDataMaxLevel}
                />
              );
            }
          })
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
  columns: PropTypes.array,
  data: PropTypes.object.isRequired,
  detailPanel: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func]))]),
  getFieldValue: PropTypes.func.isRequired,
  hasAnyEditingRow: PropTypes.bool,
  icons: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  onEditingApproved: PropTypes.func,
  onEditingCanceled: PropTypes.func,
  onRowClick: PropTypes.func,
  onRowSelected: PropTypes.func,
  onToggleDetailPanel: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  path: PropTypes.arrayOf(PropTypes.number),
  treeDataMaxLevel: PropTypes.number
};
