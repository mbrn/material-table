import { Grid, MuiThemeProvider, Button } from '@material-ui/core';
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

class App extends Component {
  tableRef = React.createRef();

  colRenderCount = 0;

  state = {
    text: 'text',
    selecteds: 0,
    data: [
      { id: 1, name: 'A1', surname: 'B', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 0, sex: 'Male', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
      { id: 2, name: 'A2', surname: 'B', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
      { id: 3, name: 'A3', surname: 'B', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
      { id: 4, name: 'A4', surname: 'C', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 3 },
      { id: 5, name: 'A5', surname: 'C', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
      { id: 6, name: 'A6', surname: 'C', isMarried: true, birthDate: new Date(1989, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 5 },
    ],
    columns: [
      {
        title: 'Adı', field: 'name', editComponent: props => {
          return (
            <input
              value={props.value}
              onChange={e => {
                var data = { ...props.rowData };
                data.name = e.target.value;
                data.surname = e.target.value.toLocaleUpperCase();
                props.onRowDataChange(data);
              }}
            />
          )
        },
        filterPlaceholder: 'Adı filter'
      },
      {
        title: 'Soyadı', field: 'surname', editComponent: props => {
          this.inputBProps = props;
          return (
            <input
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
            />
          )
        }
      },
      { title: 'Evli', field: 'isMarried', type: 'boolean' },
      { title: 'Cinsiyet', field: 'sex', disableClick: true, editable: 'onAdd' },
      { title: 'Tipi', field: 'type', removable: false, editable: 'never' },
      { title: 'Doğum Yılı', field: 'birthDate', type: 'date' },
      { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 0: 'Şanlıurfa' } },
      { title: 'Kayıt Tarihi', field: 'insertDateTime', type: 'datetime' },
      { title: 'Zaman', field: 'time', type: 'time' }
    ],
    remoteColumns: [
      { title: 'Avatar', field: 'avatar', render: rowData => <img style={{ height: 36, borderRadius: '50%' }} src={rowData.avatar} /> },
      { title: 'Id', field: 'id' },
      { title: 'First Name', field: 'first_name', defaultFilter: 'De' },
      { title: 'Last Name', field: 'last_name' },
    ],
    multiSort: {
      columns: [
        { title: 'strings', field: 'strings', defaultSort: 'asc', defaultSortOrder: 0 },
        { title: 'letters', field: 'letters', defaultSort: 'desc', defaultSortOrder: 1 },
        { title: 'bools', field: 'bools', defaultSort: 'asc', defaultSortOrder: 2, type: 'boolean' },
        { title: 'dates', field: 'dates', defaultSort: 'desc', defaultSortOrder: 3, type: 'date' },
        { title: 'date & time', field: 'datetime', defaultSort: 'asc', defaultSortOrder: 4, type: 'datetime' },
        { title: 'times', field: 'time', defaultSort: 'desc', defaultSortOrder: 5, type: 'time' },
        { title: 'numbers', field: 'numbers', defaultSort: 'asc', defaultSortOrder: 6, type: 'numeric' },
        { title: 'currencies', field: 'currencies', type: 'currency' }
      ],
      data: [
        { strings: "material-table", letters: "A", bools: false, dates: new Date(2001, 1, 1), datetime: new Date(2019, 1, 1, 12, 1, 0), time: new Date(1900, 1, 1, 17, 0, 0), numbers: 99, currencies: 0.99 },
        { strings: "material-table", letters: "A", bools: true, dates: new Date(2001, 1, 1), datetime: new Date(2019, 1, 1, 12, 1, 0), time: new Date(1900, 1, 1, 17, 1, 0), numbers: 99 , currencies: 9.99 },
        { strings: "material-table", letters: "A", bools: true, dates: new Date(2001, 1, 1), datetime: new Date(2019, 1, 1, 12, 2, 0), time: new Date(1900, 1, 1, 18, 0, 0), numbers: 10, currencies: 0.00 },
        { strings: "material-table", letters: "A", bools: true, dates: new Date(2001, 1, 1), datetime: new Date(2019, 1, 1, 12, 2, 0), time: new Date(1900, 1, 1, 17, 0, 0), numbers: 99 , currencies: 9.99 },
        { strings: "material-table", letters: "A", bools: true, dates: new Date(2001, 1, 1), datetime: new Date(2019, 1, 1, 12, 2, 0), time: new Date(1900, 1, 1, 18, 0, 0), numbers: 10, currencies: 0.00 },
        { strings: "material-table", letters: "X", bools: false, dates: new Date(2001, 2, 2), datetime: new Date(2019, 1, 1, 12, 2, 0), time: new Date(1900, 1, 1, 18, 1, 0), numbers: 10, currencies: 100.00 },
        { strings: "material-table", letters: "X", bools: true, dates: new Date(2001, 2, 2), datetime: new Date(2019, 1, 1, 12, 2, 0), time: new Date(1900, 1, 1, 19, 0, 0), numbers: 999, currencies: 1000.00 },
        { strings: "material-ui", letters: "X", bools: false, dates: new Date(2001, 2, 2), datetime: new Date(2019, 1, 1, 12, 2, 0), time: new Date(1900, 1, 1, 18, 1, 0), numbers: 10, currencies: 100.00 },
        { strings: "material-ui", letters: "X", bools: true, dates: new Date(2001, 2, 2), datetime: new Date(2019, 1, 1, 12, 2, 0), time: new Date(1900, 1, 1, 19, 0, 0), numbers: 999, currencies: 1000.00 },
        { strings: "material-ui", letters: "X", bools: false, dates: new Date(2001, 3, 3), datetime: new Date(2019, 1, 1, 12, 10, 1), time: new Date(1900, 1, 1, 20, 0, 1), numbers: 1000, currencies: 1000.01 },
      ]
    }
  }

  render() {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <div style={{ maxWidth: '100%', direction }}>
            <Grid container>
              <Grid item xs={12}>
                <MaterialTable
                  tableRef={this.tableRef}
                  columns={this.state.columns}
                  data={this.state.data}
                  title="Demo Title"
                  parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                  options={{
                    selection: true,
                    filtering: 'true'
                  }}
                />
              </Grid>
            </Grid>
            {this.state.text}
            <button onClick={() => this.tableRef.current.onAllSelected(true)} style={{ margin: 10 }}>
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
                { title: 'Id', field: 'id', filterPlaceholder:'placeholder' },
                { title: 'First Name', field: 'first_name' },
                { title: 'Last Name', field: 'last_name' },
              ]}
              options={{
                grouping: true,
                filtering: true,
              }}
              data={query => new Promise((resolve, reject) => {
                let url = 'https://reqres.in/api/users?'
                url += 'per_page=' + query.pageSize
                url += '&page=' + (query.page + 1)
                console.log(query);
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    resolve({
                      data: result.data,
                      page: result.page - 1,
                      totalCount: result.total,
                    })
                  })
              })}
            />
            <MaterialTable
              tableRef={this.tableRef}
              columns={this.state.multiSort.columns}
              data={this.state.multiSort.data}
              title="MultiSort Columns"
              options={{
                pageSize: 10,
                grouping: true,
              }}
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