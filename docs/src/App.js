import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MaterialTable from 'material-table'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: true,
      filtering: true,
      search: true,
      showColumnsButton: true,
      showPrintButton: true,
      paging: true,
      title: 'Title',
      showActions: true,
      toolbar: true,
      maxWidth: '100',
      zCount: 1,
      columns: [
        {
          title: 'Adı',
          field: 'name'          
        },
        {
          title: 'Soyadı',
          field: 'surname'          
        },
        {
          title: 'Doğum Yılı',
          field: 'birthYear',
          isNumeric: true
        },
        {
          title: 'Doğum Yeri',
          field: 'birthCity',
          lookup: {34: 'İstanbul', 63: 'Şanlıurfa'}
        }
      ],
      data: [
        {name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63},
        {name: 'Gülcan', surname: 'Baran', birthYear: 1989, birthCity: 34},
      ],
      actions: [
        {
          icon: 'save',
          tooltip: 'Save',
          action: (event, data) => {
            if (Array.isArray(data)) {
              alert("Save : " + data.length);
            } 
            else {
              alert("Save : " + data.name);
            }
          }
        },
        {
          icon: 'delete',
          tooltip: 'Delete',
          action: (event, data) => {
            if (Array.isArray(data)) {
              alert("Delete : " + data.length);
            } 
            else {
              alert("Delete : " + data.name);
            }
          }
        }
      ]
    }

    
    
  }  

  render() {
    const inputStyle={marginLeft: 40};
    const data = [...this.state.data]

    for(let i = 1; i <= this.state.zCount; i++) {
      data.push({name: i + '.Zerya Betül', surname: 'Baran', birthYear: 2017 + i, birthCity: i})
    }

    return (
      <div className="App" style={{backgroundColor: '#4aacc71a', height: '100%', padding: 50}}>
        Grid Demo
        <p className="App-intro">          
          <div style={{margin: 30, marginBottom: 100}}>
            <input style={inputStyle} type="checkbox" checked={this.state.filtering} onChange={(event) => this.setState({filtering: event.target.checked})} /> Filtering                          
            <input style={inputStyle} type="checkbox" checked={this.state.selection} onChange={(event) => this.setState({selection: event.target.checked})} /> Selection                          
            <input style={inputStyle} type="checkbox" checked={this.state.search} onChange={(event) => this.setState({search: event.target.checked})} /> Search                          
            <input style={inputStyle} type="checkbox" checked={this.state.showColumnsButton} onChange={(event) => this.setState({showColumnsButton: event.target.checked})} /> ShowColumnsButton                          
            <input style={inputStyle} type="checkbox" checked={this.state.showPrintButton} onChange={(event) => this.setState({showPrintButton: event.target.checked})} /> showPrintButton                          
            <input style={inputStyle} type="checkbox" checked={this.state.paging} onChange={(event) => this.setState({paging: event.target.checked})} /> Paging                          
            <input style={inputStyle} type="checkbox" checked={this.state.showActions} onChange={(event) => this.setState({showActions: event.target.checked})} /> Actions                          
            <input style={inputStyle} type="checkbox" checked={this.state.toolbar} onChange={(event) => this.setState({toolbar: event.target.checked})} /> Toolbar                          
            <span style={inputStyle}>Title</span><input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} /> 
            <span style={inputStyle}>Max Width</span><input type="text" value={this.state.maxWidth} onChange={(event) => this.setState({maxWidth: event.target.value})} /> 
            <span style={inputStyle}>Data Count</span><input type="text" value={this.state.zCount} onChange={(event) => this.setState({zCount: event.target.value})} /> 
          </div>

          <div style={{maxWidth: this.state.maxWidth.toString() + '%'}}>
            <MaterialTable
              actions={this.state.showActions && this.state.actions}
              columns={this.state.columns}
              data={data}
              options={{
                filtering: this.state.filtering,
                selection: this.state.selection,
                paging: this.state.paging,
                toolbar: this.state.toolbar && {
                  title: this.state.title,  
                  search: this.state.search,
                  showColumnsButton: this.state.showColumnsButton,
                  showPrintButton: this.state.showPrintButton
                }
              }}
            />
          </div>
        </p>
      </div>
    );
  }
}

export default App;
