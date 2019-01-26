/* eslint-disable no-unused-vars */
import { Toolbar, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
/* eslint-enable no-unused-vars */


class MTableGroupbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // padding: '8px 16px',
    margin: `0 ${8}px 0 0`,

    // change background colour if dragging
    // background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? 'lightblue' : '#0000000a',
    background: '#0000000a',
    display: 'flex',
    width: '100%',
    padding: 8,
    overflow: 'auto',
    border: '1px solid #ccc',
    borderStyle: 'dashed'
  });

  render() {
    const localization = { ...MTableGroupbar.defaultProps.localization, ...this.props.localization };
    return (
      <Toolbar style={{ padding: 0 }}>
        <Droppable droppableId="groups" direction="horizontal" placeholder="Deneme">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={this.getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.groupColumns.length > 0 &&
                <Typography variant="caption" style={{ padding: 8 }}>
                  Grouped By: 
                </Typography>
              }
              {this.props.groupColumns.map((columnDef, index) => {
                return (
                  <Draggable
                    key={columnDef.tableData.id}
                    draggableId={columnDef.tableData.id.toString()}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={this.getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <Button
                          size="small"
                          style={{ boxShadow: 'none', textTransform: 'none' }}
                          onClick={() => alert('ok')}
                          variant="contained"
                        >
                          <div {...provided.dragHandleProps}>{columnDef.title}</div>
                        </Button>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {this.props.groupColumns.length === 0 &&
                <Typography variant="caption" style={{ padding: 8 }}>
                  Drag your headers here to group
                </Typography>
              }
            </div>
          )}
        </Droppable>
      </Toolbar>
    );
  }
}

MTableGroupbar.defaultProps = {
};

MTableGroupbar.propTypes = {
};

export default MTableGroupbar;
