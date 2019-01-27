/* eslint-disable no-unused-vars */
import { TableCell, TableRow, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
/* eslint-enable no-unused-vars */


export default class MTableGroupRow extends React.Component {

  rotateIconStyle = isOpen => ({
    transform: isOpen ? 'rotate(90deg)' : 'none'
  });

  render() {
    let colSpan = this.props.columns.filter(columnDef => !columnDef.hidden).length;
    if(this.props.options.selection) {
      colSpan++;
    }
    const column = this.props.groups[this.props.level];

    let detail;
    if (this.props.groupData.isExpanded) {
      if (this.props.groups.length > (this.props.level + 1)) { // Is there another group
        detail = this.props.groupData.groups.map((groupData, index) => (
          <this.props.components.GroupRow
            key={groupData.value}
            columns={this.props.columns}
            components={this.props.components}
            getFieldValue={this.props.getFieldValue}
            groupData={groupData}
            groups={this.props.groups}
            icons={this.props.icons}
            level={this.props.level + 1}
            path={[...this.props.path, index]}
            onGroupExpandChanged={this.props.onGroupExpandChanged}
            onRowSelected={this.props.onRowSelected}
            options={this.props.options}
          />
        ));
      }
      else {
        detail = this.props.groupData.data.map((rowData, index) => (
          <this.props.components.Row
            key={index}
            columns={this.props.columns}
            components={this.props.components}
            data={rowData}
            getFieldValue={this.props.getFieldValue}
            path={[...this.props.path, index]}
            onRowSelected={this.props.onRowSelected}
            options={this.props.options}
          />
        ));
      }
    }

    const freeCells = [];
    for (let i = 0; i < this.props.level; i++) {
      freeCells.push(<TableCell padding="checkbox" />);
    }

    return (
      <>
        <TableRow>
          {freeCells}
          <TableCell colSpan={colSpan} padding="none">
            <IconButton
              style={{ transition: 'all ease 200ms', ...this.rotateIconStyle(this.props.groupData.isExpanded) }}
              onClick={(event) => {
                this.props.onGroupExpandChanged(this.props.path);
              }}
            >
              <this.props.icons.DetailPanel />
            </IconButton>
            <b>{column.title + ": "}</b>
            {this.props.groupData.value}
          </TableCell>
        </TableRow>
        {detail}
      </>
    );
  }
}

MTableGroupRow.defaultProps = {
  columns: [],
  groups: [],
  options: {},
  level: 0
};

MTableGroupRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  components: PropTypes.object,
  getFieldValue: PropTypes.func,
  groupData: PropTypes.object,
  groups: PropTypes.arrayOf(PropTypes.object),
  icons: PropTypes.object,
  level: PropTypes.number,
  onGroupExpandChanged: PropTypes.func,
  onRowSelected: PropTypes.func,
  options: PropTypes.object,
  path: PropTypes.arrayOf(PropTypes.number),
};
