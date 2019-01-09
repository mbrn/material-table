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
            { title: 'Adı', field: 'name', render: rowData => "Deneme", customFilterAndSearch: (a,b,c) => "Deneme".includes(a) },
            { title: 'Soyadı', field: 'surname' },
            { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
            { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
          ]}
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
