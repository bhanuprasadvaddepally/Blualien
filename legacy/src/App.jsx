import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Studio from './pages/Studio';
import Work from './pages/Work';
import Orbit from './pages/Orbit';
import Labs from './pages/Labs';
import About from './pages/About';
import People from './pages/People';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Journal from './pages/Journal';

function App() {
  return (
    <div className="app-container gradient-bg-subtle">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/work" element={<Work />} />
          <Route path="/orbit" element={<Orbit />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/about" element={<About />} />
          <Route path="/people" element={<People />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
