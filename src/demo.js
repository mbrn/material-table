import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from './material-table';

class App extends Component {
  state = {
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Gülcan', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Zerya Betül', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    ],
    selecteds: [],
    counter: 0
  }

  render() {
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Adı', field: 'name', defaultFilter: 'G' },
            { title: 'Soyadı', field: 'surname' },
            { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
            { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
          ]}
          data={this.state.data}
          title="Demo Title"
          onSelectionChange={(data) => {
            this.setState({selecteds: data});
          }}
          options={{
            emptyRowsWhenPaging: false,
            exportButton: true,
            pageSize: 100,
            pageSizeOptions: [100, 150, 200],            
            filtering: true,
            selection: true
          }}
          detailPanel={rowData => (
            <div style={{textAlign: 'center'}}>
              {rowData.name}
              <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"/>
            </div>
          )}
          actions={[
            {
              icon: 'save',
              onClick: (event, data) => {
                this.setState({counter: 0});
              }
            }
          ]}
        />
        {this.state.selecteds.length}
        <br/>
        Counter is {this.state.counter}
        <br/>
        <button onClick={() => this.setState({counter: this.state.counter + 1})}>++</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
