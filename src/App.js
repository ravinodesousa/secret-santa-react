import logo from "./logo.svg";
// import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import EmployeeList from "./screens/EmployeeList";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" exact element={<EmployeeList />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
