import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import SecretSantaList from "./screens/SecretSantaList";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/secret-santa-list" element={<SecretSantaList />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
