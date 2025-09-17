import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VotePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
