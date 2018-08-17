import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table'
import { 
  Card, CardContent, Switch,
  Grid, TextField, AppBar, 
  Toolbar,
  List, ListItem, ListItemText, 
  ListItemSecondaryAction, Typography
} from '@material-ui/core'

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
      dataCount: 100,
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
      ],
      actions: [
        {
          icon: 'save',
          tooltip: 'Save',
          onClick: (event, data) => {
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
          onClick: (event, data) => {
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
    const listStyle={backgroundColor: '#4aacc71a', margin: 2}
    const data = [...this.state.data]

    for(let i = 1; i < this.state.dataCount; i++) {
      data.push({name: 'Name ' + i, surname: 'Surname ' + i, birthYear: 2018 + i, birthCity: i})
    }

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              material-table demo
            </Typography>
          </Toolbar>
        </AppBar>
        <div class="content">
          <div style={{padding:8}}>
            <Card style={{padding: 10}}>
              <Typography variant="title" style={{textAlign: 'left'}}>Options</Typography>
              <CardContent style={{padding:5}}>
                <Grid container>
                  <Grid item xs={12} sm={4} md={4} lg={3}>
                    <List style={listStyle} dense>
                      <ListItem>
                        <ListItemText primary="Title" />
                        <ListItemSecondaryAction>
                          <TextField
                            onChange={(event) => this.setState({title: event.target.value})}
                            value={this.state.title}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Data Count" />
                        <ListItemSecondaryAction>
                          <TextField
                            onChange={(event) => this.setState({dataCount: event.target.value})}
                            value={this.state.dataCount}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Max Width (%)" />
                        <ListItemSecondaryAction>
                          <TextField
                            onChange={(event) => this.setState({maxWidth: event.target.value})}
                            value={this.state.maxWidth}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={3}>
                    <List style={listStyle} dense>
                      <ListItem>
                        <ListItemText primary="Filtering" />
                          <ListItemSecondaryAction>
                            <Switch
                              onChange={(event) => this.setState({filtering: event.target.checked})}
                              checked={this.state.filtering}
                            />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Selection" />
                        <ListItemSecondaryAction>
                          <Switch
                            onChange={(event) => this.setState({selection: event.target.checked})}
                            checked={this.state.selection}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Paging" />
                        <ListItemSecondaryAction>
                          <Switch
                            onChange={(event) => this.setState({paging: event.target.checked})}
                            checked={this.state.paging}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>                      
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={3}>
                    <List style={listStyle} dense>
                      <ListItem>
                        <ListItemText primary="Show Toolbar" />
                        <ListItemSecondaryAction>
                          <Switch
                            onChange={(event) => this.setState({toolbar: event.target.checked})}
                            checked={this.state.toolbar}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Show Columns Button" />
                        <ListItemSecondaryAction>
                          <Switch
                            onChange={(event) => this.setState({showColumnsButton: event.target.checked})}
                            checked={this.state.showColumnsButton}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Show Print Button" />
                        <ListItemSecondaryAction>
                          <Switch
                            onChange={(event) => this.setState({showPrintButton: event.target.checked})}
                            checked={this.state.showPrintButton}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={3}>
                    <List style={listStyle} dense>
                      <ListItem>
                        <ListItemText primary="Search" />
                        <ListItemSecondaryAction>
                          <Switch
                            onChange={(event) => this.setState({search: event.target.checked})}
                            checked={this.state.search}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Add Actions" />
                        <ListItemSecondaryAction>
                          <Switch
                            onChange={(event) => this.setState({showActions: event.target.checked})}
                            checked={this.state.showActions}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>

          <div style={{maxWidth: this.state.maxWidth.toString() + '%'}}>
            <MaterialTable
              actions={this.state.showActions && this.state.actions}
              columns={this.state.columns}
              data={data}
              title={this.state.title}
              options={{
                filtering: this.state.filtering,
                selection: this.state.selection,
                paging: this.state.paging,
                toolbar: this.state.toolbar,
                search: this.state.search,
                columnsButton: this.state.showColumnsButton,
                printButton: this.state.showPrintButton                
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-div'));


