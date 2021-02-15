import React from "react";
import { render, screen } from "@testing-library/react";
import MaterialTable from "../index";
import { getData, getColumns } from "./test-utils";

describe("MaterialTable", () => {
  it("renders the empty table", () => {
    render(<MaterialTable />);

    // Checks for table body
    expect(screen.getAllByRole("table")).toHaveLength(2);

    // Header
    expect(
      screen.getByRole("heading", { name: "Table Title" })
    ).toBeInTheDocument();

    // Searchbar
    expect(
      screen.getByRole("textbox", { name: /search/i })
    ).toBeInTheDocument();

    // Rows
    expect(screen.getAllByRole("rowgroup")).toHaveLength(3);
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByRole("row", { name: "" })).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: "No records to display" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", {
        name: "5 rows First Page Previous Page 0-0 of 0 Next Page Last Page",
      })
    ).toBeInTheDocument();

    // Pagination
    expect(screen.getAllByText("0-0 of 0")).toHaveLength(2);
    expect(screen.getByRole("button", { name: /5 rows/i })).toBeInTheDocument();
  });

  it("renders the table with empty columns and data", () => {
    render(<MaterialTable data={[]} columns={[]} />);

    // Checks for table body
    expect(screen.getAllByRole("table")).toHaveLength(2);

    // Header
    expect(
      screen.getByRole("heading", { name: "Table Title" })
    ).toBeInTheDocument();

    // Searchbar
    expect(
      screen.getByRole("textbox", { name: /search/i })
    ).toBeInTheDocument();

    // Rows
    expect(screen.getAllByRole("rowgroup")).toHaveLength(3);
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByRole("row", { name: "" })).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: "No records to display" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", {
        name: "5 rows First Page Previous Page 0-0 of 0 Next Page Last Page",
      })
    ).toBeInTheDocument();

    // Pagination
    expect(screen.getAllByText("0-0 of 0")).toHaveLength(2);
    expect(screen.getByRole("button", { name: /5 rows/i })).toBeInTheDocument();
  });

  it("renders the rows with columns", () => {
    render(<MaterialTable data={getData()} columns={getColumns()} />);

    expect(screen.getAllByRole("rowgroup")).toHaveLength(3);
    expect(screen.getAllByRole("row")).toHaveLength(8);

    expect(screen.getAllByRole("columnheader")).toHaveLength(7);

    expect(
      screen.getByRole("row", {
        name: "Name Birthcity Age Birthyear Birthdate Money Is available",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", {
        name: /Baran Istanbul/,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", {
        name: /Dominik Aachen/,
      })
    ).toBeInTheDocument();
  });
});
