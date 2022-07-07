import React, {useEffect, useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const Navigation = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = window.localStorage.getItem('user')
        setUser(token)
    }, [])

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {user ? (
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    ): (
                        <>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/registration">Registration</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigation;