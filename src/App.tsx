import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CityPieChart from "./components/CityPieChart/CityPieChart";
import DataFetching from "./components/DataFetching/DataFetching";

function App() {
  return (
    <div className="App">
      <DataFetching />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/city-pie-chart" element={<CityPieChart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
