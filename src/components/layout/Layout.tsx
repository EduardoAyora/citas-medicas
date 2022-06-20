import Link from 'next/link'

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
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}

export default Layout
