import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from './material-table';

class App extends Component {
  state = {
    selectedCount: 0,
    data: [
      { id: 1, name: 'axxxxxasdasdasdasd', surname: 'Baran', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 63, sex: 'Male', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
      { id: 2, name: 'bxxxxxasdasdasdasd', surname: 'Baran', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
      { id: 3, name: 'cxxxxxasdasdasdasd', surname: 'Baran', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
      { id: 4, name: 'dxxxxxasdasdasdasd', surname: 'Baran', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 3 },
      { id: 5, name: 'exxxxxasdasdasdasd', surname: 'Baran', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
      { id: 6, name: 'fxxxxxasdasdasdasd', surname: 'Baran', isMarried: true, birthDate: new Date(1989, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 5 },
    ],
    columns: [
      { title: 'Adı', field: 'name' },
      { title: 'Soyadı', field: 'surname', export: false },
      { title: 'Evli', field: 'isMarried', type: 'boolean' },
      { title: 'Cinsiyet', field: 'sex', disableClick: true },
      { title: 'Tipi', field: 'type', removable: false },
      { title: 'Doğum Yılı', field: 'birthDate', type: 'date' },
      { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } },
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
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={this.state.columns}
          data={this.state.data}
          title="Demo Title"
          options={{
            filtering: true,
            grouping: true,
            selection: true,
          }}
          // editable={{
          //   onRowAdd: (newData) => new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const data = this.state.data;
          //       data.push(newData);
          //       this.setState({ data }, () => resolve());
          //     }, 1000);
          //   }),
          //   onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const data = this.state.data;
          //       const index = data.indexOf(oldData);
          //       data[index] = newData;                
          //       this.setState({ data }, () => resolve());
          //     }, 1000);
          //   }),
          //   onRowDelete: (oldData) => new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       let data = this.state.data;
          //       const index = data.indexOf(oldData);
          //       data.splice(index, 1);
          //       this.setState({ data }, () => resolve());
          //     }, 1000);
          //   }),
          // }}
        />
        <button
          onClick={() => this.setState({ selectedCount: this.state.selectedCount + 1 })}
        >
          {this.state.selectedCount}
        </button>
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
          editable={{
            onRowAdd: (newData) => new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
            onRowDelete: (oldData) => new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
          }}
          title="Demo Title"
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
