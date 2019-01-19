import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from './material-table';

class App extends Component {
  state = {
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Gülcan', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Zerya Betül', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    ]
  }

  render() {
    const columns = [
      {
        title: 'Name',
        type: 'string',
        render: rowData => rowData.name + ' ' + rowData.surname,
        searchable: true,
        cellStyle: { fontSize: 14 }
      },
      {
        title: 'Title',
        type: 'string',
        render: rowData => rowData.title,
        cellStyle: { fontSize: 14 }
      }
    ];

    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          // columns={[
          //   {
          //     title: 'Adı', field: 'name', customSort: (a, b) => {
          //       return a.name.length - b.name.length;
          //     }
          //   },
          //   { title: 'Soyadı', field: 'surname' },
          //   { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
          //   { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
          // ]}
          columns={columns}
          data={this.state.data}
          title="Demo Title"
          options={{
            selection: true,
            filtering: true
          }}
        />
        {this.state.selectedCount}
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
