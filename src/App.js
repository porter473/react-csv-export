import React from "react";
import axios from "axios";

import { ExportToExcel } from "./ExportToExcel";

function App() {
  const [data, setData] = React.useState([]);
  const fileName = "myfile"; // here enter filename for your excel file

  React.useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          "https://api.bseindia.com/BseIndiaAPI/api/MktRGainerLoserData/w?GLtype=gainer&IndxGrp=AllMkt&IndxGrpval=AllMkt&orderby=all"
        )
        .then((r) => setData(r.data.Table));
    };
    fetchData();
  }, []);
  let [str, setStr] = React.useState("");
  return (
    <div className="App">
      <ExportToExcel apiData={data} fileName={fileName} />
      <input type="text" value={str} onChange={(e) => setStr(e.target.value)} />
    </div>
  );
}

export default App;
