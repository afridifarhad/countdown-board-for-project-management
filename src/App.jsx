import React from 'react'
import './App.css';
import Home from './pages/Home';

import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './pages/Dashboard'

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
    
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />

      </Routes>
    
    </Router>
    
    </div>
  )
}

export default App