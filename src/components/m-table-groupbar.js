/* eslint-disable no-unused-vars */
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
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
    ...draggableStyle
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
    return (
      <Toolbar style={{ padding: 0, minHeight: 'unset' }}>
        <Droppable droppableId="groups" direction="horizontal" placeholder="Deneme">
          {(provided, snapshot) => 
            (<div
              ref={provided.innerRef}
              style={this.getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.groupColumns.length > 0 &&
                <Typography variant="caption" style={{ padding: 8 }}>
                  {this.props.localization.groupedBy}
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
                        <Chip
                          {...provided.dragHandleProps}
                          onClick={() => this.props.onSortChanged(columnDef)}
                          label={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <div style={{ float: 'left' }}>{columnDef.title}</div>
                              {columnDef.tableData.groupSort &&
                                <this.props.icons.SortArrow
                                  style={{
                                    transition: '300ms ease all',
                                    transform: columnDef.tableData.groupSort === "asc" ? 'rotate(-180deg)' : 'none',
                                    fontSize: 18
                                  }}
                                />
                              }
                            </div>
                          }
                          style={{ boxShadow: 'none', textTransform: 'none' }}
                          onDelete={() => this.props.onGroupRemoved(columnDef, index)}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {this.props.groupColumns.length === 0 &&
                <Typography variant="caption" style={{ padding: 8 }}>
                  {this.props.localization.placeholder}
                </Typography>
              }
              {provided.placeholder}
            </div>)
          }
        </Droppable>
      </Toolbar>
    );
  }
}

MTableGroupbar.defaultProps = {
};

MTableGroupbar.propTypes = {
  localization: PropTypes.shape({
    groupedBy: PropTypes.string,
    placeholder: PropTypes.string
  })
};

export default MTableGroupbar;
