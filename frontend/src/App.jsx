import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductsPage from './pages/ProductsPage'
import Homepage from './pages/Homepage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/' element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
