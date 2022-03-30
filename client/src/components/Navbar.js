import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export const Navbar = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const logautHandler = (event) => {
    event.preventDefault()
    auth.logout()
    navigate.push('/')
  }

  return (
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo">
          ლინკების შემოკლება
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
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
