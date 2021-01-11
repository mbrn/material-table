const JSpdf = typeof window !== 'undefined' ? require('jspdf').jsPDF : null;

export const defaultExportPdf = (props = {}, getTableData = () => {}) => {
  if (JSpdf !== null) {
    const [columns, data] = getTableData();

    const content = {
      startY: 50,
      head: [columns.map((columnDef) => columnDef.title)],
      body: data
    };

    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';

    const doc = new JSpdf(orientation, unit, size);
    doc.setFontSize(15);
    doc.text(props.exportFileName || props.title, 40, 40);
    doc.autoTable(content);
    doc.save((props.exportFileName || props.title || 'data') + '.pdf');
  }
};
