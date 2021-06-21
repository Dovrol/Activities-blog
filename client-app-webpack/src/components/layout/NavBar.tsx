import React from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar, NavLink } from 'react-bootstrap';
import { useStore } from '../../stores/store';
import {LinkContainer} from 'react-router-bootstrap'

export default function NavBar() {
    const {activityStore} = useStore();


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <img
                            src="/src/Assets/logo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top mx-3"
                            alt="React Bootstrap logo"
                        />
                        Reactivities
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="pills">
                        <LinkContainer to='/activities'>
                            <Nav.Link className="mx-lg-2 my-1 my-lg-0 text-center">Activities</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/createActivity'>
                            <Button variant="success">Add Activity</Button>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}