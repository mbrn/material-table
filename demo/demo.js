import { Grid, MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from '../src';
import { data, columns, remoteColumns } from './dummy';
import theme from './muiTheme';

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
    time: new Date(1900, 1, 1, 14, 23, 35),
  };
  bigData.push(d);
}

class App extends Component {
  tableRef = React.createRef();

  colRenderCount = 0;

  state = { remoteColumns, data, columns, text: 'text' };

  onRowAdd = newData =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        {
          /* const data = this.state.data; data.push(newData); this.setState({ data }, () => resolve()); */
        }
        resolve();
      }, 1000);
    });

  render() {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <div style={{ maxWidth: '100%', direction: 'ltr' }}>
            <Grid container>
              <Grid item xs={12}>
                <MaterialTable
                  tableRef={this.tableRef}
                  columns={this.state.columns}
                  data={this.state.data}
                  title="Demo Title"
                  options={{
                    selection: true,
                    columnsButton: true,
                    filtering: true
                  }}
                  editable={{
                    onRowAdd: this.onRowAdd,
                  }}
                />
              </Grid>
            </Grid>
            {this.state.text}
            <button
              onClick={() => this.tableRef.current.onAllSelected(true)}
              style={{ margin: 10 }}
            >
              Select
            </button>
            <MaterialTable
              title="Remote Data Preview"
              columns={remoteColumns}
              options={{
                grouping: true,
                filtering: true,
              }}
              data={query =>
                new Promise((resolve, reject) => {
                  let url = 'https://reqres.in/api/users?';
                  url += 'per_page=' + query.pageSize;
                  url += '&page=' + (query.page + 1);
                  /* eslint-disable-next-line no-undef */
                  fetch(url)
                    .then(response => response.json())
                    .then(result => {
                      resolve({
                        data: result.data,
                        page: result.page - 1,
                        totalCount: result.total,
                      });
                    });
                })
              }
            />
          </div>
        </MuiThemeProvider>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
