import React from "react";
// import axios from "axios";

import { ExportToExcel } from "./ExportToExcel";

function App() {
  const fileName = "myfile"; // here enter filename for your excel file

  let [str, setStr] = React.useState("");
  return (
    <div className="App">
      <ExportToExcel fileName={fileName} />
      <input type="text" value={str} onChange={(e) => setStr(e.target.value)} />
    </div>
  );
}

export default App;
