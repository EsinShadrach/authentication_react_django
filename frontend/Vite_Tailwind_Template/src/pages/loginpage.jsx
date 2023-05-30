import React, { useContext } from 'react'
import AuthContext from '../context/authContext'

export default function LoginPage() {
  let {loginUser} = useContext(AuthContext)
  
  return (
    <div>
        <form onSubmit={loginUser}>
            <input  className='border' type="text" name="username" placeholder='enter Username' />
            <input  className='border' type="password" name='password' placeholder='password' />
            <button className='border' >Submit</button>
        </form>
    </div>
  )
}
