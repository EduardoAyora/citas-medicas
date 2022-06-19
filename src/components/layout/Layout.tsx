import React from 'react'

interface Props {
  links: Link[]
}

const Layout: React.FC<Props> = ({ links }) => {
  return (
    <div>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Layout
