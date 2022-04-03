import React from 'react'

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>ლინკი</h2>
      <p>
        თქვენი ლინკი:{' '}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        საიდან:{' '}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        კლიკების რაოდენობა: <strong>{link.clicks}</strong>
      </p>
      <p>
        შექმნის თარიღი:{' '}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  )
}
