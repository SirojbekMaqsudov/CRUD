import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        window.localStorage.clear()
        navigate('/login')
    })

    return (
        <div className='LogOut'>

        </div>
    );
};

export default Logout;