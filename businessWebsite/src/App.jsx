import React from 'react'
import Header from './components/header/Header.jsx'
import Details from './components/details/Details.jsx'
import Pricing from './components/pricing/Pricing.jsx'
import Footer from './components/Footer/Footer.jsx'
import Banner from './components/baner/Banner.jsx'

const App = () => {
  return (
    <div className='app'>
        <Header/>
        <Banner/>
        <Details/>
        <Banner/>
        <Pricing/>
        <Footer/>
    </div>
  )
}

export default App
