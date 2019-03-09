import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from './material-table';

class App extends Component {
  state = {
    selectedCount: 0,
    data: [
      { id: 1, name: 'ax', surname: 'Baran', birthYear: 1987, birthCity: 63, sex: 'Male', type: 'adult' },
      { id: 2, name: 'bx', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'adult', parentId: 1 },
      { id: 3, name: 'cx', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'child', parentId: 1 },
      { id: 4, name: 'dx', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'child', parentId: 3 },
      { id: 5, name: 'ex', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'child' },
      { id: 6, name: 'fx', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'child', parentId: 5 },
    ],
    columns: [
      { title: 'Adı', field: 'name' },
      { title: 'Soyadı', field: 'surname', export: false },
      { title: 'Cinsiyet', field: 'sex', disableClick: true },
      { title: 'Tipi', field: 'type', removable: false },
      { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
      { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } },
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
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          // columns={this.state.columns}
          // data={this.state.data}
          columns={this.state.remoteColumns}
          data={(query) => new Promise((resolve, reject) => {
            let url = "https://reqres.in/api/users?";
            url += "per_page=" + query.pageSize;
            url += "&page=" + (query.page + 1);

            /*global fetch:false*/
            fetch(url).then(response => response.json()).then(result => {
              resolve({
                data: result.data,
                page: result.page - 1,
                totalCount: result.total
              });
            });
          })}
          title="Demo Title"
        />
        <button
          onClick={() => this.setState({ selectedCount: this.state.selectedCount + 1 })}
        >
          ok
        </button>

        {this.state.selectedCount}

        <MaterialTable
          columns={this.state.columns}
          data={this.state.data}               
          title="Demo Title"
          detailPanel={[
            {
              tooltip: 'Show Name',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 100,
                      textAlign: 'center',
                      color: 'white',
                      backgroundColor: '#43A047',
                    }}
                  >
                    {rowData.name}
                  </div>
                );
              },
            },
            {
              icon: 'account_circle',
              tooltip: 'Show Surname',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 100,
                      textAlign: 'center',
                      color: 'white',
                      backgroundColor: '#E53935',
                    }}
                  >
                    {rowData.surname}
                  </div>
                );
              },
            },
            rowData => ({
              disabled: rowData.name === "ax",
              icon: 'favorite_border',
              openIcon: 'favorite',
              tooltip: 'Show Both',              
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 100,
                      textAlign: 'center',
                      color: 'white',
                      backgroundColor: '#FDD835',
                    }}
                  >
                    {rowData.name} {rowData.surname}
                  </div>
                );
              },
            }),
          ]}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
