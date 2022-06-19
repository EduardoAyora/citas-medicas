import React from 'react'

interface Props {
  links: Link[]
  children: JSX.Element
}

const Layout: React.FC<Props> = ({ links, children }) => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}

export default Layout
