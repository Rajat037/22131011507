import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UrlShortenerForm from "./components/UrlShortenerForm";
import StatisticsPage from "./components/StatisticsPage";

function App() {
  return (
    <Router>
      <div style={{ padding: "2rem" }}>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/statistics">Statistics</Link>
        </nav>
        <Routes>
          <Route path="/" element={<UrlShortenerForm />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
