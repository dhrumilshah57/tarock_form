import React, { useContext } from 'react'
import { AuthContext, useAuth } from './store/AuthContext'

function Home() {
  // const { data, setData } = useContext(AuthContext)
  const authCtx = useAuth();
  console.log(authCtx.data)
  // console.log(data)
  const name = authCtx.data?.userdata?.name ?? "User"
  console.log(name);
  return (
    <div className='text-black'>welcome {name}</div>
  )
}

export default Home