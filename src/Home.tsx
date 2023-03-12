import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Data, User } from './models/user';
import { AuthContext, useAuth } from './store/AuthContext'


function Home() {
  // const { data, setData } = useContext(AuthContext)
  const authCtx = useAuth();
  // console.log(authCtx.data)
  // console.log(data)
  const auth = localStorage.getItem('auth');
  const initialToken = auth ? JSON.parse(localStorage.getItem('auth') ?? "") as User : undefined;
  // const name = initialToken?.data.name
  // console.log(name);
  const [data, setData] = useState<User>()
  useEffect(() => {
    fetch("https://interview-api.kodecreators.com/api/users/detail", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${initialToken?.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data.data));
  }, []);
  // const details = JSON.stringify(dataObtain)
  console.log(data?.data)
  return (
    <div className='dark:bg-[#0D1117] h-screen'>



      <div className="p-4 sm:ml-64">
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-[#21262D]">
              <p className="text-2xl text-gray-400 dark:text-gray-500">hello {initialToken?.data.name}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home