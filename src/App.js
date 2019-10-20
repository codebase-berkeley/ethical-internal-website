import React from 'react';
import './App.css';
import Announcements from './components/Announcements';
import Inventory from './components/Inventory';
import Orders from './components/Orders';

function App() {
  return (
    <div className="App">
      <Announcements />
      <Inventory />
      <Orders />
    </div>
  );
}

export default App;
