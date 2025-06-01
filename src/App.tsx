import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import { PollPage } from "./pages/poll";
import { VideoTrimmerPage } from "./pages/videoTrimmer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video-trimmer" element={<VideoTrimmerPage />} />
        <Route path="/poll" element={<PollPage />} />
      </Routes>
    </Router>
  );
}

export default App;
