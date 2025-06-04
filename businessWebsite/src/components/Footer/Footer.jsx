import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src="/vite.svg" alt="" />
            <p>Expect reply time within 2 business days</p>
            <p>Open from 10AM to 6pm (Monday to Friday)</p>
            <div className="footer-social-icons">
                <img src="/facebook_icon.png"alt="" />
                <img src="/linkedin_icon.png" alt="" />
                <img src="/twitter_icon.png" alt="" />
            </div>
        </div>

        <div className="contact">
          <h2>  CONTACT US AT</h2>
          <h3>enhaoliu14@gmail.com</h3>
        </div>

      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ tomato.com All right Reserved</p>
    </div>
  )
}

export default Footer
