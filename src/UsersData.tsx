import React, { useState, useEffect } from 'react'
import useSWR from "swr";
import { User } from './models/user';
import Users from './Users';



function UsersData() {
    const auth = localStorage.getItem('auth');
    const initialToken = auth ? JSON.parse(localStorage.getItem('auth') ?? "") as User : undefined;
    console.log(initialToken?.token)
    const [data, setData] = useState()


    // const fetcher = (url: URL) => fetch(url).then((res) => res.json());
    // const { data, error, isLoading } = useSWR(
    //     "https://interview-api.kodecreators.com/api/users/detail",
    //     fetcher
    // );

    // if (error) return "An error has occurred.";
    // if (isLoading) return "Loading...";


    useEffect(() => {
        fetch("https://interview-api.kodecreators.com/api/users?page=1&per_page=10",
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${initialToken?.token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => setData(data.data));
    }, []);
    console.log(JSON.stringify(data))
    console.log(data)
    return (
        <div>
            <Users data={data ?? []} rowsPerPage={5} />
        </div>
    )
}

export default UsersData