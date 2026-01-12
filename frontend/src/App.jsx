import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductsPage from './pages/ProductsPage'
import Homepage from './pages/Homepage'
import Footer from './components/Footer'
import WishlistPage from './pages/WhishlistPage'
import Breadcrumb from './components/Breadcrumb'
import Blog from './pages/Blog'

function App() {
  return (
    <BrowserRouter>

      <Header />
      <Breadcrumb />

      <Routes>
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/wishlist' element={<WishlistPage />} />
        <Route path='/blogs' element={<Blog />} />

      </Routes>

      {/* <Footer /> */}

    </BrowserRouter>
  )
}

export default App
