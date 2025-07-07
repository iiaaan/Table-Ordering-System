import React, { useState } from 'react'
import Header from './components/header/Header.jsx'
import Details from './components/details/Details.jsx'
import Pricing from './components/pricing/Pricing.jsx'
import Footer from './components/Footer/Footer.jsx'
import Banner from './components/baner/Banner.jsx'
import LoginPopup from './components/loginPopUp/LoginPopup.jsx'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className='app'>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
        <Header setShowLogin={setShowLogin}/>
        <Banner/>
        <Details/>
        <Banner/>
        <Pricing/>
        <Footer/>
    </div>
  )
}

export default App
