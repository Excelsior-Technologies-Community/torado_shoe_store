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
import ExampleProductDisplay from './components/products/ExampleProductDisplay'
import ProductSingle from './components/products/ProductSingle'
import Portfolio from './pages/Portfolio'
import TrackMyOrder from './pages/TrackMyOrder'

function App() {
  return (
    <BrowserRouter>

      <Header />
      <Breadcrumb />

      <Routes>
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductSingle />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/wishlist' element={<WishlistPage />} />
        <Route path='/blogs' element={<Blog />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/trackmyorder' element={<TrackMyOrder />} />

      </Routes>

      {/* <Footer /> */}

    </BrowserRouter>
  )
}

export default App
