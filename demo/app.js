import React from "react";
import MaterialTable from "../src";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();
const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <MaterialTable
        columns={[
          {
            title: "First Name",
            field: "firstName",
          },
          {
            title: "Last Name",
            field: "lastName",
          },
        ]}
        data={[
          {
            firstName: "Mark",
            lastName: "Zipagang",
          },
        ]}
      />
    </MuiThemeProvider>
  );
};

export default App;
