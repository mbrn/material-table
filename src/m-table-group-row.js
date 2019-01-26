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
    const colSpan = this.props.columns.filter(columnDef => !columnDef.hidden).length;
    const column = this.props.groups[this.props.level];

    let detail;
    if (this.props.groupData.isExpanded) {
      if (this.props.groups.length > (this.props.level + 1)) { // Is there another group
        detail = this.props.groupData.groups.map((groupData, index) => (
          <this.props.components.GroupRow
            columns={this.props.columns}
            components={this.props.components}
            getFieldValue={this.props.getFieldValue}
            groupData={groupData}
            groups={this.props.groups}
            icons={this.props.icons}
            level={this.props.level + 1}
            path={[...this.props.path, index]}
            onGroupExpandChanged={this.props.onGroupExpandChanged}
            options={this.props.options}
          />
        ));
      }
      else {
        detail = this.props.groupData.data.map(rowData => (
          <this.props.components.Row
            columns={this.props.columns}
            components={this.props.components}
            data={rowData}
            getFieldValue={this.props.getFieldValue}
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
};

MTableGroupRow.propTypes = {
};
