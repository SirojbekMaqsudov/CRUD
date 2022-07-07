import React, {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";

const Edit = () => {
    const [user, setUser] = useState({})

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        phoneNumber: "",
        age: "",
        gender: ""
    })

    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        const token = window.localStorage.getItem('user')
        if (!token) {
            return navigate('/login')
        }
    })

    useEffect(() => {
        axios.get(`http://localhost:5000/user/${id}`).then(({data}) => {
            setUser(data)
            setValues({...data})
        })
    }, [])

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const image = document.querySelector('#file')

        const formData = new FormData()

        formData.append('firstname', values.firstname)
        formData.append('lastname', values.lastname)
        formData.append('phoneNumber', values.phoneNumber)
        formData.append('age', values.age)
        formData.append('gender', values.gender)

        formData.append('avatar', image.files[0])

        axios.put(`http://localhost:5000/user/update/${id}`, formData).then(({data}) => {
            const {error} = data
            if (error){
                return toast.error(error, {
                    autoClose: 3000,
                    theme: 'dark',
                    position: "bottom-right"
                })
            }

            navigate('/dashboard')
        })
    }
    return (
        <div className='Edit mt-5'>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Control placeholder={'Firstname'} className='mt-3' name={'firstname'} value={values.firstname}
                                  onChange={handleChange}/>
                    <Form.Control placeholder={'LastName'} className='mt-3' name={'lastname'} value={values.lastname}
                                  onChange={handleChange}/>
                    <Form.Control placeholder={'Phone Number'} className='mt-3' name={'phoneNumber'}
                                  value={values.phoneNumber} onChange={handleChange}/>
                    <Form.Control placeholder={'Age'} className='mt-3' name={'age'} value={values.age}
                                  onChange={handleChange}/>

                    <Form.Control type={'file'} id={'file'} className={'mt-3'} />

                    <Form.Select className='mt-3' name='gender' onChange={handleChange} defaultValue={values.gender}>
                        {values.gender === 'male' ? (
                            <>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </>
                        ): (
                            <>
                                <option value="female">female</option>
                                <option value="male">male</option>
                            </>
                        )}
                    </Form.Select>

                    <Button variant={'primary'} className='mt-3' type={'submit'} >Save Changes</Button>
                </Form>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default Edit;