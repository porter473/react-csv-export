import * as XLSX from "xlsx";

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

const exportToCSVBlob = (apiData, fileName) => {
  const ws = XLSX.utils.json_to_sheet(apiData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: fileType });
  return blob;
};

onmessage = (e) => {
  const { apiData, fileName } = e.data;
  const startTime = new Date().getTime();
  const blob = exportToCSVBlob(apiData, fileName);
  postMessage({
    time: new Date().getTime() - startTime,
    blob
  });
};