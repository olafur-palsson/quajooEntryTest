import React from 'react';
import WeatherWidget from './components/WeatherWidget'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherWidget />
      </header>
    </div>
  );
}

export default App;
