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
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          options={{
            filtering: true,
            grouping: false,
            selection: true,
            columnsButton: true,
            pageSize: 10
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
