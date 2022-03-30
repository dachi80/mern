import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export const Navbar = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const logautHandler = (event) => {
    event.preventDefault()
    auth.logout()
    navigate('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 4rem' }}>
        <span className="brand-logo">ლინკების შემოკლება</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">დამატება</NavLink>
          </li>
          <li>
            <NavLink to="/links">ლინკები</NavLink>
          </li>
          <li>
            <a href="/" onClick={logautHandler}>
              გასვლა
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
