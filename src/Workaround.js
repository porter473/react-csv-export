import React, { useState, useEffect, useRef, Fragment } from "react";
import { CSVLink } from "react-csv";

const CsvExport = ({ asyncExportMethod, children, headers}) => {
  const [csvData, setCsvData] = useState([]);
  const csvInstance = useRef();
  console.log("headers: ", headers);
  useEffect(() => {
    if (csvData && csvData.length>0 && csvInstance.current && csvInstance.current.link && csvInstance.current.link.click && typeof csvInstance.current.link.click == 'function') {
        console.log("newCsvData in useEffect: ",csvData);
        console.log("cicked");
        
        // csvInstance.current.link.click();  // causing trouble
      setTimeout(() => {     
        csvInstance.current.link.click();  // hack TBD
      }, 1000);
    }
  }, [csvData]);
  return (
    <Fragment>
      <button
        onClick={async () => {
          const newCsvData = await asyncExportMethod();
          console.log("newCsvData: ",newCsvData);
          setCsvData( newCsvData);
        }}
      >
        {children}
      </button>
      {csvData && csvData.length>0 ? (
          
        <CSVLink
          data={csvData}
          headers={headers}
          filename={"my-file.csv"}
          ref={csvInstance}
        />
      ) : (
        undefined
      )}
    </Fragment>
  );
};

export default CsvExport;
