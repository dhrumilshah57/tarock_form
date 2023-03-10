import React, { createContext, useContext, useEffect, useState } from 'react'
import logo from './tarockLogo.svg'
import bg_img from './background.svg'
import { replace, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Data, User, } from './models/user';
import { AuthContext, useAuth } from './store/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Form() {
    const [error, setError] = useState<string>();
    const [status, setStatus] = useState<string>();
    const auth = localStorage.getItem('auth');
    const initialToken = auth ? JSON.parse(localStorage.getItem('auth') ?? "") as User : undefined;

    // const [data, setData] = useState<User>();
    const { setData } = useAuth()
    // useEffect(() => {
    //     if (localStorage.getItem('auth')) navigate('/home')
    // }, [status === "1"])
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async values => {
            // alert(JSON.stringify(values, null, 2));
            const dataToSubmit = {
                email: values.email,
                password: values.password
            }
            console.log(dataToSubmit)
            let res = await fetch('https://interview-api.kodecreators.com/api/users/login', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(dataToSubmit)
            })
            let dataObtained = await res.json() as User;
            // console.log(data.userdata.name)
            setData(dataObtained)
            setError(dataObtained.status)
            setError(dataObtained.message)
            // console.log(dataObtained)
            //     .then(res => {
            //         return (
            //             setError(res.message),
            //             setStatus(res.status),
            //             localStorage.setItem('auth', res.status),
            //             console.log(JSON.stringify(res)),
            //             // localStorage.setItem('name', res.),
            //             setData(res.data)
            //             // navigate("/home", { replace: true })
            //         )
            //     })
            { dataObtained.status === '1' ? localStorage.setItem('auth', JSON.stringify(dataObtained)) : localStorage.setItem('auth', '0') }

            if (initialToken?.status === "1") {
                navigate("/home/dashboard", { replace: true })
                toast.success("Login Succesfully!", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,})
            }
        },
    });
    // console.log(localStorage.getItem('name'))

    // if(status==="1"){
    //     props.user=(true)
    // }
    // if(status==="0"){
    //     return(
    //         <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
    //                         <div className="flex">
    //                             <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
    //                             <div>
    //                                 <p className="font-bold">{error} {status}</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //     )
    // }
    // localStorage.setItem('auth',)
    return (
        <section className=' text-black h-screen w-full' >
            <img src={bg_img} className="w-full h-full object-cover mix-blend-overlay fixed z-0" alt="" />
            {/* md:py-96 xs:py-56 */}
            <div className='flex place-content-center lg:py-40 md:py-60 xs:py-56 xxs:py-24' >
                <div className='flex flex-col items-stretch xl:w-3/12 md:w-6/12 xs:w-80 xxs:w-72 bg-orange-300 rounded-md'>
                    <div className='self-center'>
                        <img className='h-24 w-36 ' src={logo} alt="" />
                    </div>
                    <div className='flex flex-col'>
                        <label className='pb-2 pt-4 self-center text-red-500 font-bold font-sans text-lg'>E-mail</label>
                        <input type="email" name='email' className='z-50 pl-3 outline-none border-b-2 border-orange-400 w-10/12 self-center bg-transparent ' onChange={formik.handleChange}
                            value={formik.values.email} />
                        <label className='pb-2 pt-4 self-center text-red-500 font-bold font-sans text-lg'>Password</label>
                        <input type="password" name="password" className='z-50 pl-3 outline-none border-b-2 border-orange-400 w-10/12 self-center bg-transparent' onChange={formik.handleChange}
                            value={formik.values.password} />
                        <div className='self-center p-8 z-20'>
                            <button type='submit' onClick={() => { formik.submitForm() }} className=' w-20 hover:bg-orange-400 p-2 bg-red-500 duration-300 hover:text-black transition ease-in-out delay-150 hover:-translate-y-1 rounded-md'>Login!</button>
                        </div>
                        {/* {<p className='pl-10 pb-3'>{error}</p>}
                        {<div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                            <p className="font-bold">{error}</p>
    </div>} */}
                        {
                            <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                                <div className="flex">
                                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                                    <div>
                                        <p className="font-bold">{error}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
            {/* <div className='bg-no-repeat bg-cover bg-center z-0'>
            <img src={bg_img} className="" alt="" />
            </div> */}
        </section>
    )
}

export default Form