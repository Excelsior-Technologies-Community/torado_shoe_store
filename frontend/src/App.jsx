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
import Cart from './pages/Cart'
import Register from './auth/Register'
import Login from './auth/Login'
import TermAndConditions from './pages/servicepages/TermAndConditions'
import FAQ from './pages/servicepages/FAQ'
import AboutUS from './pages/servicepages/AboutUS'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/*' element={
          <>
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
              <Route path='/cart' element={<Cart />} />
              <Route path='/termandconditions' element={<TermAndConditions />} />
              <Route path='/faqs' element={<FAQ />} />
              <Route path='/aboutus' element={<AboutUS />} />
            </Routes>
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
