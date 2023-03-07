import { useFormik } from 'formik'
import React from 'react'
import "./AddItem.css";
import { User } from './models/user';

function EditItem(props: { closeModal: React.Dispatch<React.SetStateAction<boolean>>, id: any }) {
    const auth = localStorage.getItem('auth');
    const initialToken = auth ? JSON.parse(localStorage.getItem('auth') ?? "") as User : undefined;
    console.log(props.id)
    const formik = useFormik({
        initialValues: {
            name: ''
        },
        onSubmit: values => {
            // console.log('form values', values, id, stateId)
            const dataToSubmit = {
                name: values.name,
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
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            props.closeModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="text-3xl text-center ">
                    <h1>Rename User</h1>
                </div>
                <div className="ml-5 mt-10">
                    <form className="flex flex-col" onSubmit={formik.handleSubmit} method='POST' action="#">

                        <label className="text-lg ">User Name</label>
                        <input value={formik.values.name} onChange={formik.handleChange} name="name" placeholder="Enter User Name" className="text-black border-2 border-opacity-5 rounded-md  outline-none mt-3 h-11 text-lg pl-3" />
                        <label className="text-lg pt-3">User Name</label>
                        <input value={formik.values.name} onChange={formik.handleChange} name="name" placeholder="Enter User Name" className="text-black border-2 border-opacity-5 rounded-md  outline-none mt-3 h-11 text-lg pl-3" />
                        <label className="text-lg pt-3">Gender</label>
                        <div className='flex gap-5 pt-3'>
                            <div><input type="radio" value="Male" />{' '}<label>Male</label></div>
                            <div><input type="radio" value="Female" />{' '}<label>Female</label></div>
                        </div>
                        <label className="text-lg pt-3">Date Of Birth</label>
                        <input type="date" className='text-black border-2 border-opacity-5 rounded-md  outline-none mt-3 h-11 text-lg pl-3' />
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