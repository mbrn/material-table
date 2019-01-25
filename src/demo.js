import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from './material-table';

class App extends Component {
  state = {
    selectedCount: 0,
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, sex: 'Male', type: 'adult' },
      { name: 'Gülcan', surname: undefined, birthYear: 1987, sex: 'Female', type: 'adult' },
      { name: 'Zerya Betül', surname: 'Baran', birthYear: 1987, birthCity: 63, sex: 'Female', type: 'child' }
    ],
    columns: [
      { title: 'Adı', field: 'name' },
      { title: 'Soyadı', field: 'surname' },
      { title: 'Cinsiyet', field: 'sex', tableData: { groupOrder: 0 } },
      { title: 'Tipi', field: 'type', tableData: { groupOrder: 1 } },
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
            filtering: false,
            exportButton: true,
            exportDelimiter: ';'
          }}
        />
        {this.state.selectedCount}
        <button onClick={() => {
          this.setState({ selectedCount: this.state.selectedCount + 1 });
        }}>
          ok
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
