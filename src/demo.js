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
    selecteds: 0,
    data: [
      { id: 1, name: 'axxxxxasdasdasdasd', surname: 'Baran', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Male', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
      { id: 2, name: 'bxxxxxasdasdasdasd', surname: 'Baran', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
      { id: 3, name: 'cxxxxxasdasdasdasd', surname: 'Baran', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
      { id: 4, name: 'dxxxxxasdasdasdasd', surname: 'Baran', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 3 },
      { id: 5, name: 'exxxxxasdasdasdasd', surname: 'Baran', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
      { id: 6, name: 'fxxxxxasdasdasdasd', surname: 'Baran', isMarried: true, birthDate: new Date(1989, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 5 },
    ],
    columns: [
      {
        title: 'Adı',
        render: rowData => rowData.name + ' ' + rowData.surname,
        customFilterAndSearch: (term, rowData) => false
      },
      { title: 'Soyadı', field: 'surname' },
      { title: 'Evli', field: 'isMarried', type: 'boolean', readonly: true },
      { title: 'Cinsiyet', field: 'sex', disableClick: true, readonly: true },
      { title: 'Tipi', field: 'type', removable: false },
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
      <MuiThemeProvider theme={theme}>
        <div style={{ maxWidth: '100%', direction }}>
          <Grid container>
            <Grid item xs={12}>
              <MaterialTable
                ref={this.tableRef}
                columns={this.state.columns}
                data={this.state.data}
                title="Demo Title"                
                editable={{
                  onRowAdd: (newData) => new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {/* const data = this.state.data;
                      data.push(newData);
                      this.setState({ data }, () => resolve()); */}
            
                      resolve();
                    }, 1000);
                  }),
                  onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {/* const data = this.state.data;
                      const index = data.indexOf(oldData);
                      data[index] = newData;                
                      this.setState({ data }, () => resolve()); */}
                      resolve();
                    }, 1000);
                  }),
                  onRowDelete: (oldData) => new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {/* let data = this.state.data;
                      const index = data.indexOf(oldData);
                      data.splice(index, 1);
                      this.setState({ data }, () => resolve()); */}
                      resolve();
                    }, 1000);
                  }),
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
          <MaterialTable
            columns={[
              { title: "Adı", field: "name" },
              { title: "Soyadı", field: "surname" },
              { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
              {
                title: "Doğum Yeri",
                field: "birthCity",
                lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
              }
            ]}
            data={[
              { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
              {
                name: "Zerya Betül",
                surname: "Baran",
                birthYear: 1987,
                birthCity: 63
              }
            ]}
            title="Multiple Detail Panel With RowClickExample"
            detailPanel={[
              {
                tooltip: "Show Name",
                render: rowData => {
                  return (
                    <div
                      style={{
                        fontSize: 100,
                        textAlign: "center",
                        color: "white",
                        backgroundColor: "#43A047"
                      }}
                    >
                      {rowData.name}
                    </div>
                  );
                }
              },
              {
                icon: "account_circle",
                tooltip: "Show Surname",
                render: rowData => {
                  return (
                    <div
                      style={{
                        fontSize: 100,
                        textAlign: "center",
                        color: "white",
                        backgroundColor: "#E53935"
                      }}
                    >
                      {rowData.surname}
                    </div>
                  );
                }
              },
              rowData => ({
                disabled: rowData.name === "ax",
                icon: "favorite_border",
                openIcon: "favorite",
                tooltip: "Show Both",
                render: rowData => {
                  return (
                    <div
                      style={{
                        fontSize: 100,
                        textAlign: "center",
                        color: "white",
                        backgroundColor: "#FDD835"
                      }}
                    >
                      {rowData.name} {rowData.surname}
                    </div>
                  );
                }
              })
            ]}
            onRowClick={(event, rowData, togglePanel) => togglePanel(1)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
