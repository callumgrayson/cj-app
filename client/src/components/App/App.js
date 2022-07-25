import { useState } from "react";
import "./App.css";
import ImportData from "../ImportData/ImportData";
import CreateData from "../CreateData/CreateData";
import AccessServer from "../AccessServer/AccessServer";
import LocalStorage from "../LocalStorage/LocalStorage";
import Bitwise from "../Bitwise/Bitwise";
import SVGExperiments from "../SVGExperiments/SVGExperiments";

const components = {
  ImportData,
  CreateData,
  AccessServer,
  LocalStorage,
  Bitwise,
  SVGExperiments,
};

function App() {
  const [view, setView] = useState("Bitwise");

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
