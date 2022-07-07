import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const UserPage = () => {
    const [user, setUser] = useState({})

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
        })
    }, [])

    return (
        <div className={'UserPage mt-5'}>
            <Container>
                <div className="User">
                    <img src={`http://localhost:5000/${user.avatar}`} alt="" style={{width: "150px"}}/>
                </div>
                <div className="userData mt-5">
                    <p>id: {user.id}</p>
                    <p>firstname: {user.firstname}</p>
                    <p>lastname: {user.lastname}</p>
                    <p>phoneNumber: {user.phoneNumber}</p>
                    <p>Age: {user.age}</p>
                    <p>Gender: {user.gender}</p>
                </div>
            </Container>
        </div>
    );
};

export default UserPage;