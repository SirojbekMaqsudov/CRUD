import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Table} from "react-bootstrap";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false);
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        phoneNumber: '',
        age: '',
        gender: "male"
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get('https://merncrudheroku.herokuapp.com/user').then(({data}) => {
            setUsers(data)
        })
    })

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://merncrudheroku.herokuapp.com/user/create', {...values}).then(({data}) => {
            const {error} = data
            if (error){
                return toast.error(error, {
                    autoClose: 3000,
                    theme: "dark",
                    position: "bottom-right"
                })
            }

            handleClose()
        })
    }

    const handleDelete = (id) => {
        axios.delete(`https://merncrudheroku.herokuapp.com/user/delete/${id}`).then(({data}) => {
            console.log(data)
        })
    }

    return (
        <div className='Users mt-5'>

            <Button variant="outline-primary" onClick={handleShow} className='w-100'>
                Add User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Control placeholder={'Firstname'} className='mt-3' name={'firstname'} value={values.firstname} onChange={handleChange}/>
                        <Form.Control placeholder={'LastName'} className='mt-3' name={'lastname'} value={values.lastname} onChange={handleChange}/>
                        <Form.Control placeholder={'Phone Number'} className='mt-3' name={'phoneNumber'} value={values.phoneNumber} onChange={handleChange}/>
                        <Form.Control placeholder={'Age'} className='mt-3' name={'age'} value={values.age} onChange={handleChange} />
                        <Form.Select className='mt-3' name='gender' onChange={handleChange} defaultValue={values.gender} required={true}>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </Form.Select>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type={'submit'}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            <Table striped bordered hover variant="dark" className='mt-5'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>#</th>
                </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.age}</td>
                            <td>{item.gender}</td>
                            <td className='Buttons'>
                                <Button variant={'primary'} onClick={() => navigate(`/edit/${item.id}`)}><FontAwesomeIcon icon={faPen} /></Button>
                                <Button variant={'danger'} onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ToastContainer />
        </div>
    );
};

export default Users;