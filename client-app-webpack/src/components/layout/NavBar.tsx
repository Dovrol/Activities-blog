import React from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar, NavLink } from 'react-bootstrap';
import { useStore } from '../../stores/store';
import {LinkContainer} from 'react-router-bootstrap'
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import AccountStore from '../../stores/accountStore';

export default function NavBar() {
    const { accountStore: {user, logout, isLogggedIn} } = useStore();
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container className='justify-content-between'> 
                <>
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
                </>
                {isLogggedIn &&
                <>
                    <Image avatar src={user?.image ||  'src/Assets/user.png'}/>
                    <Dropdown pointing='top left' text={user?.username} style={{color: 'white'}}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to ={`/profile/${user?.username}`} text='My profile'/>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
                }
            </Container>
        </Navbar>
    )
}