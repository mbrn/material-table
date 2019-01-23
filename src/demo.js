import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from './material-table';

class App extends Component {
  state = {
    selectedCount: 0,
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987 },
      { name: 'Gülcan', surname: 'Baran', birthYear: 1987 },
      { name: 'Zerya Betül', surname: 'Baran', birthYear: 1987, birthCity: 63 }
    ],
    columns: [
      {
        title: 'Adı',
        field: 'name',
        customSort: (a, b) => {
          return a.name.length - b.name.length;
        }
      },
      { title: 'Soyadı', field: 'surname' },
      { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
      { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } },
    ]
  }

  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            {
              title: 'Adı',
              field: 'name',
              customSort: (a, b) => {
                return a.name.length - b.name.length;
              }
            },
            { title: 'Soyadı', field: 'surname' },
            { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
            { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } },
          ]}
          data={this.state.data}
          title="Demo Title"
          options={{
            filtering: true
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
