import React from "react";
import './App.css';
import { ExportToExcel } from "./ExportToExcel";
import Menu from "./Menu"

function App() {
  const fileName = "myfile"; // here enter filename for your excel file

  let [str, setStr] = React.useState("");
  return (
    <div className="App">
      <div style={{display: 'flex'}}>
        <div className="menu">
          <Menu/>
        </div>
        <div className="content" style={{display: 'flex', flexDirection: 'column'}}>
          <div id="Section1" style={{height: '600px'}}>
            "Section1"
            <ExportToExcel fileName={fileName} />
          </div> 
          <div id="Section2" style={{height: '600px'}}>
            "Section2"
            <input type="text" value={str} onChange={(e) => setStr(e.target.value)} />
          </div>
          <div id="Section3" style={{height: '600px'}}>"Section3"</div>
          <div id="Section4" style={{height: '600px'}}>"Section4"</div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
