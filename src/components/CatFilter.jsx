import React from 'react';
import { NavLink } from 'react-router-dom';
import { accentStyle } from '../theme';
import { CATEGORIES } from '../catalog';

export default function CatFilter() {
  return (
    <div className="cat-filter">
      <NavLink to="/" end className={({ isActive }) => `cat-pill${isActive ? ' is-on' : ''}`}>
        Todos
      </NavLink>
      {CATEGORIES.map((c) => (
        <NavLink
          key={c.id}
          to={`/${c.id}`}
          style={accentStyle(c.accent)}
          className={({ isActive }) => `cat-pill${isActive ? ' is-on' : ''}`}
        >
          {c.emoji} {c.label}
        </NavLink>
      ))}
    </div>
  );
}
