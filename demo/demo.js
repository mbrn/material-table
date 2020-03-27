import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { Schedule as ScheduleIcon } from '@material-ui/icons';
import MaterialTable from '../src';

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        fontWeight: 300,
        fontSize: 13,
        lineHeight: 1.5,
        borderBottom: 'none',
      },
    },
  },
  palette: {
    common: { black: "#000", white: "#fff" },
    background: {
      paper: "#fff",
      default: "#fafafa"
    },
    secondary: {
      light: "rgba(191, 230, 242, 1)",
      main: "rgba(64, 179, 217, 1)",
      dark: "rgba(0, 152, 195, 1)",
      contrastText: "#fff"
    },
    primary: {
      light: "rgba(199, 201, 200, 1)",
      main: "rgba(87, 92, 91, 1)",
      dark: "rgba(53, 55, 53, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
  },
});

function App() {
  const tableRef = React.createRef();

  const columns = [
    { title: 'ID', field: 'id', type: 'numeric', filtering: false },
    { title: 'Name', field: 'name', searchable: false },
    { title: 'Owner', field: 'owner' },
    { title: 'Group', field: 'group' },
    { title: 'Status', field: 'status', lookup: { 0: 'POWEROFF', 1: 'RUNNING', 2: 'FAILED_BOOT' } },
    { title: 'Host', field: 'host' },
    {
      title: 'IPs', field: 'ips', emptyValue: '--',
      render: rowData => rowData?.ips?.map((ip, index) => <p key={`nic-${index}`}>{ip}</p>)
    },
    {
      title: 'Charter', field: 'charter', emptyValue: '',
      render: rowData => rowData?.charter && <ScheduleIcon />
    },
  ];

  const data = [
    { id: 0, name: 'vm_1', owner: 'oneadmin', group: 'oneadmin', status: 0, host: 'localhost', ips: ['192.168.122.10', '192.168.122.13'], charter: true },
    { id: 1, name: 'vm_2', owner: 'oneadmin', group: 'oneadmin', status: 1, host: 'localhost', ips: ['192.168.122.14'] },
    { id: 2, name: 'vm_3', owner: 'oneadmin', group: 'oneadmin', status: 1, host: 'localhost', ips: ['192.168.122.15', '192.168.122.16', '192.168.122.17', '192.168.122.18'] },
    { id: 3, name: 'vm_4', owner: 'oneadmin', group: 'oneadmin', status: 2, host: 'localhost', ips: ['192.168.122.19', '192.168.122.20'] },
    { id: 4, name: 'vm_5', owner: 'oneadmin', group: 'oneadmin', status: 1, host: 'localhost', ips: ['192.168.122.21', '192.168.122.22'], charter: true },
    { id: 5, name: 'vm_6', owner: 'oneadmin', group: 'oneadmin', status: 2, host: 'localhost', ips: ['192.168.122.23', '192.168.122.24'], charter: true },
    { id: 6, name: 'vm_7', owner: 'oneadmin', group: 'oneadmin', status: 0, host: 'localhost', ips: ['192.168.122.25'], charter: true },
    { id: 7, name: 'vm_8', owner: 'oneadmin', group: 'oneadmin', status: 0, host: 'localhost', ips: ['192.168.122.26', '192.168.122.27'] },
  ];
  
  return (
    <MuiThemeProvider theme={theme}>
      <MaterialTable
        tableRef={tableRef}
        columns={columns}
        data={data}
        title="Demo Title"
        onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
        options={{
          selection: true,
          padding: 'dense',
          emptyRowsWhenPaging: false,
          showSelectAllCheckbox: true,
          paginationType: 'stepped',
        }}
        onSelectionChange={rows => console.log(rows)}
      />
    </MuiThemeProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
