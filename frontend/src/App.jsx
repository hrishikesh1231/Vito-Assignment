import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ApplyLoan from "./pages/ApplyLoan";
import Dashboard from "./pages/Dashboard";
import TrackApplication from "./pages/TrackApplication";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<ApplyLoan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/track" element={<TrackApplication />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;