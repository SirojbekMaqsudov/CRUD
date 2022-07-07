import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import Users from "./Users";

const Dashboard = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = window.localStorage.getItem('user')

        if (!token) {
            navigate('/login')
        }
    })

    return (
        <div className='Dashboard text-center'>
            <Container>
                <Users />
            </Container>
        </div>
    );
};

export default Dashboard;