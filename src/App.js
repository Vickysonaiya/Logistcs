import { Route, Routes } from "react-router-dom";
import "./App.css";
import LRDetails from "./LrDetails";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LRDetails />} />
      </Routes>
    </div>
  );
}

export default App;
