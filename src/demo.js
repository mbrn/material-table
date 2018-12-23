import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from './material-table';

class App extends Component {
  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Adı', field: 'name', filtering: false, render: () => <div>merhaba</div> },
            { title: 'Soyadı', field: 'surname', filtering: false },
            { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
            { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, filtering: false }
          ]}
          data={[
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
          ]}
          title="Demo Title"
          options={{
            emptyRowsWhenPaging: false,
            exportButton: true,
            pageSize: 100,
            pageSizeOptions: [100, 150, 200],            
            filtering: true,
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
