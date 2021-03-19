import React from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';

interface Props {
    changeEditMode: (isEditMode: boolean) => void;
}



export default function NavBar({changeEditMode} : Props) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src="src/Assets/logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top mx-3"
                        alt="React Bootstrap logo"
                    />
                    Reactivities
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="pills">
                        <Nav.Link className="mx-2">Activities</Nav.Link>
                        <Button onClick={() => changeEditMode(true)} variant="success">Add Activity</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}