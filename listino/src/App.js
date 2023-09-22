import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Venditore from './components/Venditore'
import Dashboard from './components/dashboard';
import AddProduct from './components/AddProduct';
import './index.css'

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' Component={Login} />
          <Route path='/menu' Component={Menu} />
          <Route path='/venditore' Component={Venditore} />
          <Route path='/venditore/dashboard' Component={Dashboard} />
          <Route path='/venditore/dashboard/add' Component={AddProduct} />
        </Routes>
      </Router>
    )
}

export default App;
