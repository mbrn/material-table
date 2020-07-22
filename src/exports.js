import { CsvBuilder } from "filefy";
import "jspdf-autotable";
const jsPDF = typeof window !== "undefined" ? require("jspdf") : null;

export const defaultExportCsv = (columns, data, props) => {
  let fileName = props.title || "data";
  if (props.exportFileName) {
    fileName =
      typeof props.exportFileName === "function"
        ? props.exportFileName()
        : props.exportFileName;
  }

  const dataarray = data.map((row) => columns.map((c) => row[c.field]));

  const builder = new CsvBuilder(fileName + ".csv");
  builder
    .setDelimeter(props.exportDelimiter)
    .setColumns(columns.map((columnDef) => columnDef.title))
    .addRows(dataarray)
    .exportFile();
};

export const defaultExportPdf = (columns, data, props) => {
  if (jsPDF !== null) {
    const dataarray = data.map((row) => columns.map((c) => row[c.field]));

    const content = {
      startY: 50,
      head: [columns.map((columnDef) => columnDef.title)],
      body: dataarray,
    };

    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    doc.text(props.title, 40, 40);
    doc.autoTable(content);
    doc.save((props.exportFileName || props.title || "data") + ".pdf");
  }
};
