import React from 'react';
import worker from 'workerize-loader!./ExportToExcelWorker'; // eslint-disable-line import/no-webpack-loader-syntax
import * as FileSaver from "file-saver";
const fileExtension = ".xlsx";
// const worker = new window.Worker("./ExportToExcelWorker.js");
const workerInstance = worker()
export const ExportToExcel = ({ apiData, fileName }) => {
  
  const exportToCSV = (apiData, fileName) => {
      console.log("apiData: ", apiData);
    workerInstance.postMessage({ apiData, fileName });
    workerInstance.onerror = (err) => err;
    workerInstance.onmessage = (e) => {
      const {time, blob, error} = e.data
      console.log("time-taken", time)
      if(blob) FileSaver.saveAs(blob, fileName + fileExtension)
      else
        console.log(error);
    };
  };
  
  return (
    <button onClick={(e) => exportToCSV(apiData, fileName)}>Export</button>
  );
};