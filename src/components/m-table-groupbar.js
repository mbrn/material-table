/* eslint-disable no-unused-vars */
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
/* eslint-enable no-unused-vars */

class MTableGroupbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: '8px 16px',
    margin: `0 ${8}px 0 0`,

    // change background colour if dragging
    // background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  getListStyle = (isDraggingOver) => ({
    // background: isDraggingOver ? 'lightblue' : '#0000000a',
    background: "#0000000a",
    display: "flex",
    width: "100%",
    p: 1,
    overflow: "auto",
    border: "1px solid #ccc",
    borderStyle: "dashed",
  });

  render() {
    return (
      <Toolbar sx={{ p: 0, minHeight: "unset" }}>
        <Droppable
          droppableId="groups"
          direction="horizontal"
          placeholder="Deneme"
        >
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              sx={this.getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.groupColumns.length > 0 && (
                <Typography variant="caption" sx={{ p: 1 }}>
                  {this.props.localization.groupedBy}
                </Typography>
              )}
              {this.props.groupColumns.map((columnDef, index) => {
                return (
                  <Draggable
                    key={columnDef.tableData.id}
                    draggableId={columnDef.tableData.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={this.getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Chip
                          {...provided.dragHandleProps}
                          onClick={() => this.props.onSortChanged(columnDef)}
                          label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box sx={{ float: "left" }}>
                                {columnDef.title}
                              </Box>
                              {columnDef.tableData.groupSort && (
                                <this.props.icons.SortArrow
                                  sx={{
                                    transition: "300ms ease all",
                                    transform:
                                      columnDef.tableData.groupSort === "asc"
                                        ? "rotate(-180deg)"
                                        : "none",
                                    fontSize: 18,
                                  }}
                                />
                              )}
                            </Box>
                          }
                          sx={{ boxShadow: "none", textTransform: "none" }}
                          onDelete={() =>
                            this.props.onGroupRemoved(columnDef, index)
                          }
                        />
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {this.props.groupColumns.length === 0 && (
                <Typography variant="caption" sx={{ p: 1 }}>
                  {this.props.localization.placeholder}
                </Typography>
              )}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Toolbar>
    );
  }
}

MTableGroupbar.defaultProps = {};

MTableGroupbar.propTypes = {
  localization: PropTypes.shape({
    groupedBy: PropTypes.string,
    placeholder: PropTypes.string,
  }),
};

export default MTableGroupbar;
