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
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Adı', field: 'name' },
            { title: 'Soyadı', field: 'surname' },
            { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
            { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
          ]}
          data={this.state.data}
          title="Demo Title"
          options={{
            emptyRowsWhenPaging: false,
            exportButton: true,
            pageSize: 100,
            pageSizeOptions: [100, 150, 200],            
            filtering: true,
            selection: true
          }}
          detailPanel={[
            {
              tooltip: 'Show Name',
              render: rowData => {
                return <div>{rowData.name}</div>;
              }
            },
            {
              icon: 'save',
              tooltip: 'Show Surname',
              render: rowData => {
                return <div>{rowData.surname}</div>;
              }
            },
            {
              icon: 'computer',
              tooltip: 'Show Both',
              render: rowData => {
                return <div>{rowData.name} {rowData.surname}</div>;
              }
            }
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
