import React, {useEffect, useState} from 'react';
import {Card, Container, Form} from "react-bootstrap";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import jwtDecode from "jwt-decode";
import {useNavigate} from 'react-router-dom'

const Registration = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const token = window.localStorage.getItem('user')
        if (token){
            navigate('/dashboard')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('https://merncrudheroku.herokuapp.com/auth/registration', {username, password}).then(({data}) => {
            const {error} = data

            if (error) {
                toast.error(error, {theme: "dark", autoClose: 3000, position: 'bottom-right'})
            }

            const {token} = data

            if (token){
                window.localStorage.setItem('user', jwtDecode(token))
                navigate('/dashboard')
            }
        })
    }

    return (
        <div className='Auth'>
            <Container>
                <Card className={'mt-5'}>
                    <Card.Body>
                        <Card.Title className={'text-center'}>
                            Registration
                        </Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Control placeholder='Username' className='mt-2'
                                          onChange={e => setUsername(e.target.value)} value={username}/>
                            <Form.Control placeholder='Password' className='mt-2'
                                          onChange={e => setPassword(e.target.value)} value={password}/>

                            <button type="submit" className='mt-3'>Submit</button>
                        </Form>
                    </Card.Body>
                </Card>
                <ToastContainer />
            </Container>
        </div>
    );
};

export default Registration;