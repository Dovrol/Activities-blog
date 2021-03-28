import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <Container>
            <h1>Home page</h1>
            <h2>Go to <Link to='/activities'>activities</Link></h2>
        </Container>
    )
}

export default HomePage
