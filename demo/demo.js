import { Grid, MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from '../src';

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

const Aggregations = {
  Count: (label) => ({
    Accumulate: (accumulator = 0) => ++accumulator,
    GetResult: (accumulator) => accumulator,
    label
  }),
  Sum: (label) => ({
    Accumulate: (accumulator = 0, currentValue) => accumulator + (currentValue || 0),
    GetResult: (accumulator) => accumulator,
    label
  }),
  Avg: (label) => ({
    Accumulate: (accumulator = { sum: 0, count: 0 }, currentValue) => ({ sum: accumulator.sum + (currentValue || 0), count: accumulator.count + 1 }),
    GetResult: (accumulator) => accumulator.sum / accumulator.count,
    label
  }),
};

class App extends Component {
  tableRef = React.createRef();

  colRenderCount = 0;

  state = {
    text: 'text',
    selecteds: 0,
    data: [
      { id: 1, name: 'A1', surname: 'B', salary: 54654635, isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 0, sex: 'Male', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
      { id: 2, name: 'A2', surname: 'B', salary: 12434513, isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
      { id: 3, name: 'A3', surname: 'B', salary: 115626, isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
      { id: 4, name: 'A4', surname: 'C', salary: 7412699, isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 3 },
      { id: 5, name: 'A5', surname: 'C', salary: 965434, isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
      { id: 6, name: 'A6', surname: 'C', salary: 524364, isMarried: true, birthDate: new Date(1989, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 5 },
    ],
    columns: [
      { title: 'First Name', field: 'name' },
      { title: 'Last Name', field: 'surname' },
      { title: 'Married', field: 'isMarried', type: 'boolean', aggregation: Aggregations.Count("Nb") },
      { title: 'Gender', field: 'sex', disableClick: true, editable: 'onAdd' },
      { title: 'Type', field: 'type', removable: false, editable: 'never' },
      { title: 'Birthday', field: 'birthDate', type: 'date', grouping: false },
      { title: 'Birth place', field: 'birthCity', lookup: { 34: 'Lagnieu', 0: 'Ambérieu-en-Bugey' } },
      { title: 'Created On', field: 'insertDateTime', type: 'datetime' },
      { title: 'Salary', field: 'salary', aggregation: Aggregations.Avg() },
      { title: 'Time', field: 'time', type: 'time' }
    ],
    remoteColumns: [
      { title: 'Avatar', field: 'avatar', render: rowData => <img style={{ height: 36, borderRadius: '50%' }} src={rowData.avatar} /> },
      { title: 'Id', field: 'id' },
      { title: 'First Name', field: 'first_name' },
      { title: 'Last Name', field: 'last_name' },
    ]
  }

  render() {
    return (

      <>
        <MuiThemeProvider theme={theme}>
          <input type="text" value={this.state.text} onChange={e => this.setState({ text: e.target.value, colRenderCount: this.colRenderCount })} />
          {this.state.colRenderCount}
          <div style={{ maxWidth: '100%', direction }}>
            <Grid container>
              <Grid item xs={12}>
                <MaterialTable
                  tableRef={this.tableRef}
                  columns={this.state.columns}
                  data={this.state.data}
                  title="Demo Title"
                  options={{
                    maxBodyHeight: '400px',
                    grouping: true
                  }}
                />
              </Grid>
            </Grid>
            {this.state.text}
            <button onClick={() => this.tableRef.current.onAllSelected(true)}>
              Select
            </button>
            <MaterialTable
              title="Remote Data Preview"
              columns={[
                {
                  title: 'Avatar',
                  field: 'avatar',
                  render: rowData => (
                    <img
                      style={{ height: 36, borderRadius: '50%' }}
                      src={rowData.avatar}
                    />
                  ),
                },
                { title: 'Id', field: 'id' },
                { title: 'First Name', field: 'first_name' },
                { title: 'Last Name', field: 'last_name' },
              ]}
              options={{
                grouping: true
              }}
              data={query =>
                new Promise((resolve, reject) => {
                  let url = 'https://reqres.in/api/users?'
                  url += 'per_page=' + query.pageSize
                  url += '&page=' + (query.page + 1)
                  fetch(url)
                    .then(response => response.json())
                    .then(result => {
                      resolve({
                        data: result.data,
                        page: result.page - 1,
                        totalCount: result.total,
                      })
                    })
                })
              }
            />
          </div>
        </MuiThemeProvider>
      </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
