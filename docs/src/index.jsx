import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table'
import { 
  Card, CardContent, Switch,
  Grid, TextField, AppBar, 
  Icon, IconButton, Toolbar,
  List, ListItem, ListItemText, 
  ListItemSecondaryAction, Typography, Tooltip,
  SvgIcon
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
          title: 'deneme',
          field: 'deneme',
          type: 'boolean'
        },
        {
          title: 'Doğum Tarihi',
          field: 'birthYear',
          type: 'dateTime'
        },
        {
          title: 'Doğum Yeri',
          field: 'birthCity',
          lookup: {34: 'İstanbul', 63: 'Şanlıurfa'}
        }        
      ],
      data: [
        {name: 'Mehmet', surname: 'Baran', birthYear: new Date(1987, 4, 21, 17, 55, 29), birthCity: 63, deneme: true},
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
        },
        {
          icon: 'check',
          tooltip: 'New',
          isFreeAction: true,
          onClick: (event) => {
            alert("New");
          }
        }   
      ]
    }

    
    
  }  

  render() {
    const listStyle={backgroundColor: '#4aacc71a', margin: 2}
    const data = [...this.state.data]

    for(let i = 1; i < this.state.dataCount; i++) {
      data.push({name: 'Name ' + i, surname: 'Surname ' + i, birthYear: new Date(2017 + i, 8, 9), birthCity: i, deneme: false})
    }

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" style={{flexGrow: 1}}>
              material-table demo
            </Typography>
            <div>
              <Tooltip title="Github repository">
                <IconButton color="inherit" href="https://github.com/mbrn/material-table">
                  <SvgIcon>
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </div>
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


