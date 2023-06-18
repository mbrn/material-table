import {
  Grid,
  ThemeProvider,
  StyledEngineProvider,
  Button,
  adaptV4Theme,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "../src";

let direction = "ltr";
// direction = 'rtl';
const theme = createTheme(
  adaptV4Theme({
    direction: direction,
    palette: {
      mode: "light",
    },
  })
);

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      { field: "id", title: "Id" },
      { field: "userId", title: "User Id", resizable: true },
      { field: "title", title: "Title" },
      { field: "completed", title: "Completed", type: "boolean" },
    ],
    []
  );

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.log("ERROR", err);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div style={{ maxWidth: "100%", direction }}>
          <Grid container>
            <Grid item xs={12}>
              <MaterialTable
                columns={columns}
                data={data}
                title="Demo Title"
                isLoading={loading}
                options={{
                  columnResizable: true,
                }}
              />
            </Grid>
          </Grid>
          <button onClick={loadData} style={{ margin: 10 }}>
            Select
          </button>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

module.hot.accept();
