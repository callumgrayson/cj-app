import { useState } from "react";
import "./App.css";
import TableData from "../TableData/TableData";
import CreateData from "../CreateData/CreateData";
import AccessServer from "../AccessServer/AccessServer";
import LocalStorage from "../LocalStorage/LocalStorage";
import Bitwise from "../Bitwise/Bitwise";
import WavViewer from "../WavViewer/WavViewer";
import Scraper from "../Scraper/Scraper";
// import SVGExperiments from "../SVGExperiments/SVGExperiments";

const components = {
  TableData,
  CreateData,
  AccessServer,
  LocalStorage,
  Bitwise,
  WavViewer,
  Scraper,
  // SVGExperiments,
};

function App() {
  const [view, setView] = useState("Scraper");

  const C = components[view];
  return (
    <div className="App">
      <div>
        {Object.keys(components).map((key) => {
          return (
            <button
              key={key}
              className={`view-button ${key === view ? "selected" : ""}`}
              onClick={() => setView(key)}
            >
              {key}
            </button>
          );
        })}
      </div>
      <hr />
      <C />
    </div>
  );
}

export default App;
