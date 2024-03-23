import './App.css'
import React from 'react';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  return (
    <div className="app-container">
      <div className="history-section">
        <h2 className='topic-text'>Who have we seen so far?</h2>
        <div className="history-container">
          
        </div>
      </div>
      <div className="main-content">
        <div className='main-container'>
          <h1>Trippin' on Dogs</h1> 
          <h2>Discover dogs from your wildest dreams!<br/>
          🐾🐾🐾🐕🦮🐩🐕‍🦺🐾🐾🐾</h2>
          <button>Discover!</button>
        </div>
      </div>
      <div className="ban-list">
        <h2 className='topic-text'>Ban List</h2>
        <h3>Select an attribute in your<br/>listing to ban it</h3>
      </div>
    </div>
  );
}

export default App;