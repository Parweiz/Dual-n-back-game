import React from 'react'

export default ({ name, points, date }) => (
  <p>
    <strong>{name}</strong> <em>Score: {points}</em> <em>Date: {date}</em>
  </p>
);