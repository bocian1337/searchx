import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Results from './pages/Results/Results';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:query" element={<Results />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
