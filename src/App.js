import axios from "axios";
import {React, useState} from "react";
// import ReactDOM from "react-dom";
import CsvExport from "./Workaround";

function App() {
  const fetchData = async () => {
          const response = await axios.get(
            "https://api.bseindia.com/BseIndiaAPI/api/MktRGainerLoserData/w?GLtype=gainer&IndxGrp=AllMkt&IndxGrpval=AllMkt&orderby=all"
          );
          const responseData = await response.data.Table;
          return responseData;
        };

        const headers = [
          { label: "Security Code", key: "scrip_cd" },
          { label: "Security Name", key: "scripname" },
          { label: "Group", key: "scrip_grp" },
          { label: "LTP", key: "highrate" },
          { label: "Chg", key: "change_val" },
          { label: "% Chg", key: "change_percent" }
        ];
  let [str, setStr] = useState("");
  return (
    <div className="App">
      <CsvExport
        asyncExportMethod={fetchData}
        headers={headers}      >
        Download me 
      </CsvExport>
      <input type="text" value={str} onChange={e => setStr(e.target.value)}/>
    </div>
  );
}

export default App;
