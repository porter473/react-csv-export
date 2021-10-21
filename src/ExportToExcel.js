import React from 'react';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportToExcel = ({ fetchData, fileName }) => {

const [csvData, setCsvData] = React.useState([]);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  React.useEffect(() => {
    if (csvData && csvData.length>0 ) {
        exportToExcel(csvData, fileName);
    }
  }, [csvData]);

  return (
      <>
    {/* <button onClick={(e) => exportToCSV(apiData, fileName)}>Export</button> */}
    <button onClick={async () => {
        const newCsvData = await fetchData();
        console.log("newCsvData: ",newCsvData);
        setCsvData( newCsvData);
      }}>Export XLSX</button>
      </>
  );
};