import { Grid, MuiThemeProvider, FormControl, FormHelperText, MenuItem, Select } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from '../src';
import Typography from '@material-ui/core/Typography';
import { DragDropContext } from 'react-beautiful-dnd';

let direction = 'ltr';
// direction = 'rtl';
const theme = createMuiTheme({
  direction: direction,
  palette: {
    type: 'light'
  }
});

const bigData = [];
for (let i = 0; i < 1; i++) {
  const d = {
    id: i + 1,
    name: 'Name' + i,
    surname: 'Surname' + Math.round(i / 10),
    isMarried: i % 2 ? true : false,
    birthDate: new Date(1987, 1, 1),
    birthCity: 0,
    sex: i % 2 ? 'Male' : 'Female',
    type: 'adult',
    insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    time: new Date(1900, 1, 1, 14, 23, 35)
  };
  bigData.push(d);
}

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class App extends Component {
  tableRef = React.createRef();
  remoteDataTableRef = React.createRef();

  colRenderCount = 0;

  state = {
    text: 'text',
    selecteds: 0,
    data: [
      {
        id: 1,
        name: 'A1',
        surname: 'B',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 0,
        sex: 'Male',
        type: 'adult',
        insertDateTime: '1994-11-23T08:15:30-05:00',
        time: new Date(1900, 1, 1, 14, 23, 35)
      },
      {
        id: 2,
        name: 'A2',
        surname: 'B',
        isMarried: false,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'adult',
        insertDateTime: '1994-11-05T13:15:30Z',
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 1
      },
      {
        id: 3,
        name: 'A3',
        surname: 'B',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 1
      },
      {
        id: 4,
        name: 'A4',
        surname: 'Dede Dede Dede Dede Dede Dede Dede Dede',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 3
      },
      {
        id: 5,
        name: 'A5',
        surname: 'C',
        isMarried: false,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35)
      },
      {
        id: 6,
        name: 'A6',
        surname: 'C',
        isMarried: true,
        birthDate: new Date(1989, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 5
      },
      {
        id: 11,
        name: 'A1',
        surname: 'B',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 0,
        sex: 'Male',
        type: 'adult',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35)
      },
      {
        id: 21,
        name: 'A2',
        surname: 'B',
        isMarried: false,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'adult',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 1
      },
      {
        id: 31,
        name: 'A3',
        surname: 'B',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 1
      },
      {
        id: 41,
        name: 'A4',
        surname: 'Dede',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 3
      },
      {
        id: 51,
        name: 'A5',
        surname: 'C',
        isMarried: false,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35)
      },
      {
        id: 61,
        name: 'A6',
        surname: 'C',
        isMarried: true,
        birthDate: new Date(1989, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 5
      },
      {
        id: 12,
        name: 'A1',
        surname: 'B',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 0,
        sex: 'Male',
        type: 'adult',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35)
      },
      {
        id: 22,
        name: 'A2',
        surname: 'B',
        isMarried: false,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'adult',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 1
      },
      {
        id: 32,
        name: 'A3',
        surname: 'B',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 1
      },
      {
        id: 42,
        name: 'A4',
        surname: 'Dede',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 3
      },
      {
        id: 52,
        name: 'A5',
        surname: 'C',
        isMarried: false,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35)
      },
      {
        id: 62,
        name: 'A6',
        surname: 'C',
        isMarried: true,
        birthDate: new Date(1989, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 5
      },
      {
        id: 13,
        name: 'A1',
        surname: 'B',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 0,
        sex: 'Male',
        type: 'adult',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35)
      },
      {
        id: 23,
        name: 'A2',
        surname: 'B',
        isMarried: false,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'adult',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 1
      },
      {
        id: 33,
        name: 'A3',
        surname: 'B',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 1
      },
      {
        id: 43,
        name: 'A4',
        surname: 'Dede',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 3
      },
      {
        id: 53,
        name: 'A5',
        surname: 'C',
        isMarried: false,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35)
      },
      {
        id: 63,
        name: 'A6',
        surname: 'C',
        isMarried: true,
        birthDate: new Date(1989, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 5
      },
      {
        id: 14,
        name: 'A1',
        surname: 'B',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 0,
        sex: 'Male',
        type: 'adult',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35)
      },
      {
        id: 24,
        name: 'A2',
        surname: 'B',
        isMarried: false,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'adult',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 1
      },
      {
        id: 34,
        name: 'A3',
        surname: 'B',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 1
      },
      {
        id: 44,
        name: 'A4',
        surname: 'Dede',
        isMarried: true,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 3
      },
      {
        id: 54,
        name: 'A5',
        surname: 'C',
        isMarried: false,
        birthDate: new Date(1987, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35)
      },
      {
        id: 64,
        name: 'A6',
        surname: 'C',
        isMarried: true,
        birthDate: new Date(1989, 1, 1),
        birthCity: 34,
        sex: 'Female',
        type: 'child',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35),
        parentId: 5
      }
    ],
    otherdata: [],
    columns: [
      { title: 'Adı', field: 'name', filterPlaceholder: 'Adı filter', tooltip: 'This is tooltip text' },
      { width: 200, title: 'Soyadı', field: 'surname', initialEditValue: 'test', tooltip: 'This is tooltip text' },
      { title: 'Evli', field: 'isMarried' },
      { title: 'Cinsiyet', field: 'sex', disableClick: true, editable: 'onAdd' },
      { title: 'Tipi', field: 'type', removable: false, editable: 'never' },
      { title: 'Doğum Yılı', field: 'birthDate', type: 'date' },
      { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 0: 'Şanlıurfa' } },
      { title: 'Kayıt Tarihi', field: 'insertDateTime', type: 'datetime' },
      { title: 'Zaman', field: 'time', type: 'time' },
      { title: 'Adı', field: 'name', filterPlaceholder: 'Adı filter', tooltip: 'This is tooltip text' },
    ],
    remoteColumns: [
      {
        title: 'Avatar',
        field: 'avatar',
        render: rowData => <img style={{ height: 36, borderRadius: '50%' }} src={rowData.avatar}/>,
        tooltip: 'delakjdslkjdaskljklsdaj'
      },
      { title: 'Id', field: 'id' },
      { title: 'First Name', field: 'first_name', defaultFilter: 'De' },
      { title: 'Last Name', field: 'last_name' },
    ],
    dragOption: 'disabled',
    remoteDataOrder: []
  };

  resetDataOrder = (data) => {
    this.state.remoteDataOrder = [];
    data.forEach((el) => this.state.remoteDataOrder.push(el.id));
  };

  reorderData = (data) => {
    return data.sort((a, b) => {
      const aPos = this.state.remoteDataOrder.indexOf(a.id);
      const bPos = this.state.remoteDataOrder.indexOf(b.id);

      return aPos === -1 ? 1 : bPos === -1 ? 1 : aPos - bPos;
    });
  };

  onDragStart = (result) => {
    if (result.source.droppableId === "droppable1"){
      this.tableRef.current.onDragStart(result)
    } else {
      this.remoteDataTableRef.current.onDragStart(result)
    }
  }

  getList = (id) => {
    if (id === "droppable1")
    return this.state.data;
    return this.state.otherdata;
  };


  onDragEnd = (result) => {
    const { source, destination } = result;

    if (source.droppableId === "droppable1"){
      this.tableRef.current.toggleDraggableClass(result)
    } else{
      this.remoteDataTableRef.current.toggleDraggableClass(result)
    }

    // Implement combine logic.
    if (result.combine) {
      console.log("combine")
      // super simple: just removing the dragging item
      const data = [...this.state.data];
      data.splice(result.source.index, 1);
      this.setState({ data });
      return;
    }

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
    console.log("See Example multiple")

    } else {
      const res = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        data: [...res.droppable1],
        otherdata:  [...res.droppable2]
      });
    }
  };

  render() {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <div style={{ maxWidth: '100%', direction }}>
            <DragDropContext onBeforeDragStart={this.onDragStart}
                             onDragEnd={this.onDragEnd}>
              <MaterialTable
                tableRef={this.tableRef}
                options={{
                  search: false,
                  padding: 'dense',
                  toolbar: false,
                  pageSize: 5,
                  pageSizeOptions: [5, 25, 50],
                  emptyRowsWhenPaging: false,
                  draggable: false,
                  draggableRows: true,
                  draggableRowsOptions: {
                    droppableRowsIdentifier: 'droppable1'
                  },
                  disableDragDropContext: true
                }}
                columns={this.state.columns}
                data={this.state.data}
              />

              <MaterialTable
                tableRef={this.remoteDataTableRef}
                options={{
                  search: false,
                  padding: 'dense',
                  toolbar: false,
                  pageSize: 5,
                  pageSizeOptions: [5, 25, 50],
                  emptyRowsWhenPaging: false,
                  draggable: false,
                  draggableRows: true,
                  draggableRowsOptions: {
                    droppableRowsIdentifier: 'droppable2',
                    isCombineEnabled: true
                  },
                  disableDragDropContext: true
                }}
                columns={this.state.columns}
                data={this.state.otherdata}
              />
            </DragDropContext>
          </div>

        </MuiThemeProvider>
      </>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

module.hot.accept();
