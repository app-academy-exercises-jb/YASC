import React from 'react';
import { Link } from 'react-router-dom'
import background from 'images/footer-20p'
import Octocat from 'images/octocat'
import LinkedIn from 'images/linkedin'

const Footer = (props) => {
  function highlightContacts(e) {
    const icons = Array.from(document.getElementsByClassName("contact-me"));
    icons.forEach(icon => {
      icon.classList.add('highlighted')
      setTimeout(() => {icon.classList.remove('highlighted')}, 500)
    })
  }

  return (
    <footer>
      <div className="footer-banner" style={{backgroundImage: `url(${background})`}}>
        <span>
          Choose a better way to work
          <div id="footer-buttons" className="button-box" style={{flexDirection: "column"}}>
            <Link id="try-us-2" to="/signup">try yasc</Link>
            <Link id="contact-us" to="/" onClick={highlightContacts}>contact us</Link>
          </div>
          <div id="contact-me" className="button-box">
            <a className="contact-me" href="https://github.com/jorge-barreto"><img src={Octocat}></img></a>
            <a className="contact-me" href="https://www.linkedin.com/in/jorge-barreto-749232186/"><img src={LinkedIn}></img></a>
          </div>
        </span>
        
      </div>
    </footer>
  )
}

export default Footer;