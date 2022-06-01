import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <ul className="header__list">
        <NavLink to="/" className={({ isActive }) => (isActive ? "header__list-item active" : "header__list-item")}>Все котики</NavLink>
        <NavLink to="/favourites" className="header__list-item">Любимые котики</NavLink>
      </ul>
    </header>
  )
}

export default Header