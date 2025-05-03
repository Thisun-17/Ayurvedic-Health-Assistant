import React from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Ayurvedic Health Assistant</h1>
        <p>Your personal wellness companion</p>
      </header>
    </div>
  );
}

export default App;