import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Image, Container, Header, Button } from 'semantic-ui-react'
import { useStore } from '../../stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

const HomePage = () => {
    const {accountStore, modalStore} = useStore();
    return (
        // <Container>
        //     <h1>Home page</h1>
        //     <h2>Go to <Link to='/login'>Login</Link></h2>
        // </Container>
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                     <Image size='massive' src='/src/Assets/logo.png' alt='logo' style={{marginBottom: 12}}></Image>
                    Reactivities
                </Header>
                {accountStore.isLogggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Reactivities'></Header>
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to activities
                        </Button>
                    </>
                ): (
                    <>
                        <Header as='h2' inverted content='Welcome to Reactivities'></Header>
                        <Button onClick={() => modalStore.openModal(<LoginForm/>)} size='huge' inverted>
                            Login
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size='huge' inverted>
                            Register
                        </Button>
                    </>
                )}
                
            </Container>
        </Segment>
    )
}

export default observer(HomePage);
