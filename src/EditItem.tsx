import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import "./AddItem.css";
import { Country, CountryData } from './models/country';
import { User } from './models/user';

function EditItem(props: { closeModal: React.Dispatch<React.SetStateAction<boolean>>, id: any }) {
    const auth = localStorage.getItem('auth');
    const initialToken = auth ? JSON.parse(localStorage.getItem('auth') ?? "") as User : undefined;
    // console.log(props.id)
    const [country , setCountry]=useState();
    useEffect(() => {
        fetch("https://interview-api.kodecreators.com/api/countries?page=1&per_page=10", 
        {
            method: "GET",
            headers: {
                // 'Authorization': `Bearer ${initialToken?.token}`,
            },
        }
        )
            .then((response) => response.json())
            .then((data) => setCountry(data.data));
    }, []);
    const countryInfo = country ?? []
    const [countryId,setCountryId]=useState<any>();
    console.log(countryId)
    const [state , setState]=useState();
    useEffect(() => {
        fetch(`https://interview-api.kodecreators.com/api/states?page=1&per_page=10&country_id=${countryId}`, 
        {
            method: "GET",
            headers: {
                // 'Authorization': `Bearer ${initialToken?.token}`,
            },
        }
        )
            .then((response) => response.json())
            .then((data) => setState(data.data));
    }, [countryId]);
    const stateInfo = state ?? []
    
    
    
    const formik = useFormik({
        initialValues: {
            name: '',
            email:''
        },
        onSubmit: values => {
            // console.log('form values', values, id, stateId)
            const dataToSubmit = {
                name: values.name,
                email: values.email
            }
            fetch(`https://interview-api.kodecreators.com/api/users/update`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${initialToken?.token}`,
                },
                body: JSON.stringify(dataToSubmit)
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                })
            props.closeModal(false)

            // navigate(`/countries/${id}/states/${stateId}/cities`)
        },
    })


    return (
        <div className="modalBackground">
            <div className="modalContainer">
                {/* <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            props.closeModal(false);
                        }}
                    >
                        X
                    </button>
                </div> */}
                <div className="text-2xl text-center ">
                    <h1>Rename User</h1>
                </div>
                <div className="pl-1 mt-3">
                    <form className="flex flex-col" onSubmit={formik.handleSubmit} method='POST' action="#">

                    <div className='flex items-center justify-center p-3'><img className="w-20 h-20 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" /></div>
                        <input value={formik.values.name} onChange={formik.handleChange} name="name" placeholder="Enter User Name" className="text-black border-2 border-opacity-5 rounded-md  outline-none mt-2 h-11 text-lg pl-3" />
                        <input value={formik.values.email} onChange={formik.handleChange} name="email" placeholder="Enter User email" className="text-black border-2 border-opacity-5 rounded-md  outline-none mt-2 h-11 text-lg pl-3" />
                        <label className="text-lg pt-2">Gender</label>
                        <div className='flex gap-5 pt-2'>
                            <div><input type="radio" value="Male" name='gender'/>{' '}<label>Male</label></div>
                            <div><input type="radio" value="Female" name='gender'/>{' '}<label>Female</label></div>
                        </div>
                        <label className="text-lg pt-3">Date Of Birth</label>
                        <input type="date" name='dob' className='text-black border-2 border-opacity-5 rounded-md  outline-none h-11 text-lg pl-3' />
                        <select name="country" id="" value={countryId} onChange={e=>{setCountryId(e.target.value)}} className='text-black border-2 border-opacity-5 rounded-md  outline-none h-11 text-lg pl-3 mt-2'>
                            {
                                countryInfo.map((items : Country)=>{
                                    return(<option value={items.id} >
                                        {items.name}
                                    </option>)
                                })
                            }
                        </select>
                        <select name="state" id="" className='text-black border-2 border-opacity-5 rounded-md  outline-none h-11 text-lg pl-3 mt-2'>
                        {
                                stateInfo.map((items : Country)=>{
                                    return(<option>
                                        {items.name}
                                    </option>)
                                })
                            }
                            {/* <option value="none">State</option>
                            <option value="">abc</option>
                            <option value="">xyz</option>
                            <option value="">def</option> */}
                        </select>
                        <label className="text-lg pt-3">Hobbies</label>
                        <div className='grid grid-cols-2'>
                            <div><input type="checkbox" value="Cooking" name='hobbies'/>{' '}<label>Cooking</label></div>
                            <div><input type="checkbox" value="Singing" name='hobbies'/>{' '}<label>Singing</label></div>
                            <div><input type="checkbox" value="Swimming" name='hobbies'/>{' '}<label>Swimming</label></div>
                            <div><input type="checkbox" value="Dancing" name='hobbies'/>{' '}<label>Dancing</label></div>
                        </div>
                        <div className="footer mt-5">
                            <button
                                onClick={() => {
                                    props.closeModal(false);
                                }}
                                id="cancelBtn"
                            >
                                Cancel
                            </button>
                            <button >Submit</button>
                        </div>
                    </form>
                </div>


            </div >
        </div >
    )
}

export default EditItem