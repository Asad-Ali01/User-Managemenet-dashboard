
import { NavLink } from 'react-router-dom'
function Header() {
  return (
    <nav className='w-full'>
        <ul className='flex bg-amber-300 justify-center gap-10'>
        <NavLink
        to="/"
          className={({isActive}) => `hover:text-blue-600 ${isActive ? "text-blue-600 " : ""}`} 
        
        >
          Home
        </NavLink>
          <NavLink
        to="/dashboard"
          className={({isActive}) => `hover:text-blue-600 ${isActive ? "text-blue-600 " : ""}`} 
        >
          Dashboard
        </NavLink>
        </ul>
    </nav>
  )
}

export default Header