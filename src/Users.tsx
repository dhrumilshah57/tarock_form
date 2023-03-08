import React, { ReactNode, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import EditItem from './EditItem';
import useTable from './hooks/useTable';
import { Data, User } from './models/user';
import TableFooter from './TableFooter';
import UsersData from './UsersData';

function Users(props: { data: any, rowsPerPage: number }) {
    const data = props.data;
    const rowsPerPage = props.rowsPerPage;
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(page, rowsPerPage, data);
    const [userId, setUserId] = useState();
    console.log(userId)
    // const { stateId } = useParams();
    // const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const auth = localStorage.getItem('auth');
    const initialToken = auth ? JSON.parse(localStorage.getItem('auth') ?? "") as User : undefined;
    console.log(initialToken?.token)
    console.log(data.name)
    return (
        <div className="w-full h-screen ">
            {editModal && <EditItem closeModal={setEditModal} id={userId} />}
            <div className="p-4 sm:ml-64">

                <div className="p-4  dark:border-gray-700 mt-14">
                    {/* <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">{data.name}</p>
                            <p className="text-2xl text-gray-400 dark:text-gray-500">{data.email}</p>
                        </div>
                    </div> */}
                    <div className='flex items-center w-full'>
                        <div className='text-2xl'>Users</div>
                        <div className='ml-auto'><button className='bg-blue-300 h-10 w-20 outline-none border-2 border-blue-500'>Add</button></div>
                    </div>
                    <div className="relative overflow-x-auto mt-7">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-2 border-gray-200 border-dashed rounded-lg">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        DOB
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Country
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>
                                    <th scope="col" className="px-20 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    data.map((items: Data
                                    //     {
                                    //     id: string | number | readonly string[] | undefined;
                                    //     email: ReactNode;
                                    //     date_of_birth: ReactNode;
                                    //     country_id: ReactNode;
                                    //     gender: ReactNode; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                                    // }
                                    ) => {
                                        return (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {items.name}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {items.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {items.date_of_birth}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {items.country_id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {items.gender}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className='flex items-center gap-5'>
                                                        <div className=''><button value={items.id} className='bg-blue-300 h-10 w-20 outline-none border-2 border-blue-500' onClick={() => { setEditModal(true);}}>Edit</button></div>
                                                        <div className=''><button className='bg-blue-300 h-10 w-20 outline-none border-2 border-blue-500'>Delete</button></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {data.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {data.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.date_of_birth}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.country_id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.gender}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className='flex items-center gap-5'>
                                            <div className=''><button className='bg-blue-300 h-10 w-20 outline-none border-2 border-blue-500' onClick={() => { setEditModal(true); setUserId(data.id) }}>Edit</button></div>
                                            <div className=''><button className='bg-blue-300 h-10 w-20 outline-none border-2 border-blue-500'>Delete</button></div>
                                        </div>
                                    </td> */}

                            </tbody>
                        </table>
                        <TableFooter
                            range={range}
                            slice={slice}
                            setPage={setPage}
                            page={page}
                        />
                    </div>
                </div>
            </div>

            {/* {editModal && <EditItem closeModal={setEditModal} data={userId} />}
            <div className="mx-64 py-36">
                <div className="grid grid-cols-2 mb-10">
                    <h1 className="text-4xl">Cities</h1>
                    <div className='flex gap-10 place-content-end'>
                        <p className=""><button className="bg-purple-400 text-2xl w-24 rounded-md ">Create</button></p>
                        
                    </div>

                </div>


                <table className="grid place-items-center" id="country">

                    <th className="grid grid-cols-2  w-full text-center rounded-t-xl">
                        <td className="text-3xl ">Name</td>
                        <td className="text-3xl ">Action</td>
                    </th>


                    {slice.map((item) => {
                        return (
                            <tr className="grid grid-cols-2 w-full text-center">
                                <td className="text-xl">{item.name}</td>
                                <div className='grid grid-cols-2 mx-36'>
                                    <td className="text-xl"><button className="bg-blue-300 text-md rounded-lg w-24 m-1" onClick={() => { setEditModal(true); setUserId(item) }} >Edit</button></td>
                                </div>
                            </tr>
                        )
                    })}
                </table>
                <TableFooter
                    range={range}
                    slice={slice}
                    setPage={setPage}
                    page={page}
                />
            </div> */}
        </div>
    )
}

export default Users