import React from 'react'
import './Footer.css'
function Footer() {
    let date= new Date();
    let year=date.getFullYear();
  return (
    <>
        <footer>
        <p className="footer">© {year} All Rights Reserved.</p>
    </footer>
    </>
  )
}

export default Footer