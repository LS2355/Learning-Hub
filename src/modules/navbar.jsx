import { Link, NavLink } from "react-router-dom"  //navlink
import { useState} from "react"

export function Navbar () {

  const [menuIsOpen, setMenuIsOpen] = useState(false)



  return (
    <nav className="flex justify-between w-screen bg-navbar sticky top-0 flex-col xs:flex-row ali items-start xs:items-center sm:hidden">

      <Link to="/"  className="text-2xl m-3 no-underline text-white">Learning Hub</Link>
      <div className="absolute top-3 right-2 justify-between flex-col w-9 h-8 flex xs:hidden" onClick={()=>setMenuIsOpen(!menuIsOpen)}>
        <span className="h-1.5 w-full bg-white rounded-md"></span>
        <span className="h-1.5 w-full bg-white rounded-md"></span>
        <span className="h-1.5 w-full bg-white rounded-md"></span>
      </div>
    <ul className={` flex-col xs:flex-row w-full xs:w-auto mb-1 xs:mb-0 ${menuIsOpen? "flex": "hidden xs:flex"}`}> {/* if menuIsOpen == true , then set display to flex else hide*/}
      <li className="list-none w-full xs:w-auto text-center xs:text-left">
        <NavLink to="/" className="block no-underline text-subtext p-2 my-1 mx-2 rounded-lg hover:bg-black/75">Learning</NavLink> {/* i want this do be the default page open*/}
      </li>
      <li className="list-none w-full xs:w-auto text-center xs:text-left">
        <NavLink to="/practice" className="block no-underline text-subtext p-2 my-1 mx-2 rounded-lg hover:bg-black/75">Practice</NavLink>
      </li>
      <li className="list-none w-full xs:w-auto text-center xs:text-left">
        <NavLink to="/settings" className="block no-underline text-subtext p-2 my-1 mx-2 rounded-lg hover:bg-black/75">Settings</NavLink> 
      </li>
    </ul>

    </nav>
  ) 
}

