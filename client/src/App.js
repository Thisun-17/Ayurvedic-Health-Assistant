import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import HealthTracker from './pages/HealthTracker';
import Practitioners from './pages/Practitioners';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tracker" element={<HealthTracker />} />
            <Route path="/practitioners" element={<Practitioners />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;