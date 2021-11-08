import * as XLSX from "xlsx";
import axios from "axios";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

const exportToCSVBlob = () => 
  axios
    .get(
      "https://api.bseindia.com/BseIndiaAPI/api/MktRGainerLoserData/w?GLtype=gainer&IndxGrp=AllMkt&IndxGrpval=AllMkt&orderby=all"
    )
    .then((r) => {
      console.log(r);
      const ws = XLSX.utils.json_to_sheet(r.data.Table);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: fileType });
      return blob;
    });

onmessage = (e) => {
  const startTime = new Date().getTime();

  const getBlob = exportToCSVBlob();
  getBlob.then((bloburl) => {
    postMessage({
      time: new Date().getTime() - startTime,
      blob: bloburl,
    });
  });
};
