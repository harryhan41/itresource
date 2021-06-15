import React from 'react'
import Logout from '../security/Logout'
// import { useSelector } from 'react-redux';


export const TopBar = () => {
  // const info = useSelector(state => state.auth);
  return (
    <div>
       {/* {info.isAuthed && <Logout/>} */}
      <a href="#about">Resource Management</a>
      <Logout/>
    </div>
  )
}

export default TopBar