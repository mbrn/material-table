import { Grid, MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from './material-table';

let direction = 'ltr';
// direction = 'rtl';
const theme = createMuiTheme({
  direction: direction,
  palette: {
    type: 'light'
  }
});

class App extends Component {
  tableRef = React.createRef();

  state = {
    text: 'text',
    selecteds: 0,
    data: [
      { id: 1, name: 'a', surname: 'baran', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 0, sex: 'Male', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
      { id: 2, name: 'b', surname: 'baran', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
      { id: 3, name: 'c', surname: 'baran', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
      { id: 4, name: 'd', surname: 'baran', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 3 },
      { id: 5, name: 'e', surname: 'baran', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
      { id: 6, name: 'f', surname: 'baran', isMarried: true, birthDate: new Date(1989, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 5 },
    ],
    columns: [
      { title: 'Adı', field: 'name' },
      { title: 'Soyadı', field: 'surname' },
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
      { title: 'First Name', field: 'first_name' },
      { title: 'Last Name', field: 'last_name' },
    ]
  }

  render() {
    return (

      <>
        <MuiThemeProvider theme={theme}>
          <div style={{ maxWidth: '100%', direction }}>
            <Grid container>
              <Grid item xs={12}>
                <MaterialTable
                  ref={this.tableRef}
                  columns={this.state.columns}
                  data={this.state.data}
                  title="Demo Title"
                  options={{
                    filtering: true,
                  }}
                />
              </Grid>

            </Grid>
            <button
              onClick={() => {
                this.tableRef.current.onQueryChange();
              }}
            >
              ok
          </button>

          </div>
        </MuiThemeProvider>
        {/* <MuiThemeProvider theme={createMuiTheme({ palette: { primary: { main: '#abc' } } })}>
          <MaterialTable
            ref={this.tableRef}
            columns={this.state.columns}
            data={(query) => new Promise(() => {
            })}
            title="Demo Title"
            options={{
              selection: true,
            }}
            isLoading
          />
        </MuiThemeProvider> */}
      </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
