import CropProductionTable from "./components/CropProductionTable";
import CropStatisticsTable from "./components/CropStatisticsTable";
import React from "react";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
        Crop Production Data
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <h2 style={{ textAlign: "center" }}>Crop Production by Year</h2>
          <CropProductionTable />
        </div>
        <div>
          <h2 style={{ textAlign: "center" }}>Crop Statistics (1950-2020)</h2>
          <CropStatisticsTable />
        </div>
      </div>
    </div>
  );
};

export default App;
