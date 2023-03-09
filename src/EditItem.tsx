import { useFormik, Field } from 'formik'
import React, { useEffect, useState } from 'react'
import "./AddItem.css";
import { Country, CountryData } from './models/country';
import { User } from './models/user';

function EditItem(props: { closeModal: React.Dispatch<React.SetStateAction<boolean>>, data: any }) {
    const auth = localStorage.getItem('auth');
    const initialToken = auth ? JSON.parse(localStorage.getItem('auth') ?? "") as User : undefined;
    // console.log(props.id)
    console.log(props.data);
    const userInfo = props.data;
    const [country, setCountry] = useState();
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
    const [countryId, setCountryId] = useState<any>(1);
    console.log(countryId)
    const [state, setState] = useState();
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

    const hobbies_data = userInfo.hobbies ? userInfo.hobbies.split(", ") : [];
    // console.log(hobbies_data[0]);




    const formik = useFormik({
        initialValues: {
            name: userInfo.name,
            email: userInfo.email,
            gender: userInfo.gender,
            date_of_birth: userInfo.date_of_birth,
            // country_id: userInfo.country_id,
            // state_id: userInfo.state_id,
            hobbies: hobbies_data
        },
        onSubmit: values => {
            // console.log('form values', values, id, stateId)
            console.log(values.hobbies);
            const dataToSubmit = {
                name: values.name,
                email: values.email,
                gender: values.gender,
                date_of_birth: values.date_of_birth,
                // country_id: values.country_id,
                // state_id: values.state_id,
                hobbies: values.hobbies.join(", ")
            }

            fetch(`https://interview-api.kodecreators.com/api/users/${userInfo.id}/update`, {
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

                        <div className='flex items-center justify-center p-3'><img className="w-20 h-20 rounded-full" src={userInfo.img_url} alt="user photo" /></div>
                        <input value={formik.values.name} onChange={formik.handleChange} name="name" placeholder="Enter User Name" className="text-black border-2 border-opacity-5 rounded-md  outline-none mt-2 h-11 text-lg pl-3" />
                        <input value={formik.values.email} onChange={formik.handleChange} name="email" placeholder="Enter User email" className="text-black border-2 border-opacity-5 rounded-md  outline-none mt-2 h-11 text-lg pl-3" />
                        <label className="text-lg pt-2">Gender</label>
                        <div className='flex gap-5 pt-2'>
                            <div><input type="radio" value="MALE" name='gender' onChange={formik.handleChange} checked={formik.values.gender === "MALE"} />{' '}<label>Male</label></div>
                            <div><input type="radio" value="FEMALE" name='gender' onChange={formik.handleChange} checked={formik.values.gender === "FEMALE"} />{' '}<label>Female</label></div>
                        </div>
                        <label className="text-lg pt-3">Date Of Birth</label>
                        <input type="date" name='date_of_birth' className='text-black border-2 border-opacity-5 rounded-md  outline-none h-11 text-lg pl-3' value={formik.values.date_of_birth} onChange={formik.handleChange} />
                        <select name="country" id="" value={countryId} onChange={e => { setCountryId(e.target.value) }} className='text-black border-2 border-opacity-5 rounded-md  outline-none h-11 text-lg pl-3 mt-2'>
                            {
                                countryInfo.map((items: Country) => {
                                    return (<option value={items.id} >
                                        {items.name}
                                    </option>)
                                })
                            }
                        </select>
                        <select name="state" id="" className='text-black border-2 border-opacity-5 rounded-md  outline-none h-11 text-lg pl-3 mt-2' onChange={formik.handleChange}>
                            {
                                stateInfo.map((items: Country) => {
                                    return (<option>
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
                            <div><input type="checkbox" value="cooking" name='hobbies' onChange={formik.handleChange} defaultChecked={hobbies_data.includes("cooking")} />{' '}<label>Cooking</label></div>
                            <div><input type="checkbox" value="cycling" name='hobbies' onChange={formik.handleChange} defaultChecked={hobbies_data.includes("cycling")} />{' '}<label>Cycling</label></div>
                            <div><input type="checkbox" value="swimming" name='hobbies' onChange={formik.handleChange} defaultChecked={hobbies_data.includes("swimming")} />{' '}<label>Swimming</label></div>
                            <div><input type="checkbox" value="video games" name='hobbies' onChange={formik.handleChange} defaultChecked={hobbies_data.includes("video games")} />{' '}<label>Video Games</label></div>
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