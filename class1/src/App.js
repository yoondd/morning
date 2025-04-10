import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import GuestBook from './pages/GuestBook';
import ScrollText from './pages/ScrollText';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/guestbook" element={<GuestBook/>}/>
          <Route path="/scrolltext" element={<ScrollText/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
