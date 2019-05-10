import { Grid, MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from '../src';

let direction = 'ltr';
// direction = 'rtl';
const theme = createMuiTheme({
    direction: direction,
    palette: {
        type: 'light'
    }
});

const bigData = [];
for (let i = 0; i < 1; i++) {
    const d = {
        id: i + 1,
        name: 'Name' + i,
        surname: 'Surname' + Math.round(i / 10),
        isMarried: i % 2 ? true : false,
        birthDate: new Date(1987, 1, 1),
        birthCity: 0,
        sex: i % 2 ? 'Male' : 'Female',
        type: 'adult',
        insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
        time: new Date(1900, 1, 1, 14, 23, 35)
    };
    bigData.push(d);
}

class App extends Component {
    tableRef = React.createRef();

    colRenderCount = 0;

    dateDiffInYears(a, b) {
        console.log(a, b)
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / (86400000 * 365));
    }

    state = {
        text: 'text',
        selecteds: 0,
        data: [
            { id: 1, name: 'A1', surname: 'B', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 0, sex: 'Male', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
            { id: 2, name: 'A2', surname: 'B', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
            { id: 3, name: 'A3', surname: 'B', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 1 },
            { id: 4, name: 'A4', surname: 'C', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 3 },
            { id: 5, name: 'A5', surname: 'C', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35) },
            { id: 6, name: 'A6', surname: 'C', isMarried: true, birthDate: new Date(1989, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), parentId: 5 },
        ],
        columns: [
            { title: 'Adı', field: 'name', render: (rowData) => {
                    this.colRenderCount++;
                    const divStyle = {
                        color: 'black',
                        backgroundColor: 'green'
                    };
                    return <div style={divStyle}>{rowData.name}</div>;
                }},
            { title: 'Soyadı', field: 'surname' },
            { title: 'Evli', field: 'isMarried', type: 'boolean' },
            { title: 'Cinsiyet', field: 'sex', disableClick: true, editable: 'onAdd' },
            { title: 'Tipi', field: 'type', removable: false, editable: 'never' },
            { title: 'Doğum Yılı', field: 'birthDate', type: 'date' },
            { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 0: 'Şanlıurfa' } },
            { title: 'Kayıt Tarihi', field: 'insertDateTime', type: 'datetime' },
            { title: 'Zaman', field: 'time', type: 'time' },
            { title: 'Age', headerStyle: { paddingRight: 4, minWidth: '80px'},
                cellStyle: data => { return {paddingRight: 4, minWidth: '80px'} },
                render: rowData => this.dateDiffInYears(rowData.birthDate, new Date())
            }
        ],
        remoteColumns: [
            { title: 'Avatar', field: 'avatar', render: rowData => <img style={{ height: 36, borderRadius: '50%' }} src={rowData.avatar} /> },
            { title: 'Id', field: 'id' },
            { title: 'First Name', field: 'first_name' },
            { title: 'Last Name', field: 'last_name' },
        ]
    }

    render() {
        return (

            <>
                <MuiThemeProvider theme={theme}>
                    <input type="text" value={this.state.text} onChange={e => this.setState({ text: e.target.value, colRenderCount: this.colRenderCount })} />
                    {this.state.colRenderCount}
                    <div style={{ maxWidth: '100%', direction }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <MaterialTable
                                    tableRef={this.tableRef}
                                    columns={this.state.columns}
                                    data={this.state.data}
                                    title="Demo Title"
                                    options={{
                                        selection: true,
                                        grouping: true,
                                        exportButton: true
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {this.state.text}
                        <button onClick={() => this.tableRef.current.onAllSelected(true)}>
                            Select
                        </button>
                    </div>
                </MuiThemeProvider>
            </>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

module.hot.accept();
