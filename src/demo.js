import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from './material-table';

class App extends Component {
  state = {
    selectedCount: 0,
    data: [
      { name: 'C', surname: 'Baran', birthYear: 1987, birthCity: 63, sex: 'Male', type: 'adult' },
      { name: 'BB', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'adult' },
      { name: 'AAA', surname: 'Baran', birthYear: 1987, birthCity: 34, sex: 'Female', type: 'child' }
    ],
    columns: [
      {
        title: 'Adı', field: 'name', customSort: (a, b, type) => {
          if (type === 'row') {
            return a.name.length - b.name.length;
          }
          else if(type === 'group') {
            return a.length - b.length;
          }
        }
      },
      { title: 'Soyadı', field: 'surname' },
      { title: 'Cinsiyet', field: 'sex' },
      { title: 'Tipi', field: 'type', removable: false },
      { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
      { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } },
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
            columnsButton: true,
            grouping: true
          }}
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
