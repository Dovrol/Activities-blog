import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

interface Props {
    content? : string,
    size? : string
}

const LoadingComponent = ({content = "Loading app...", size="sm"} : Props) => {
    return (
        <Container>
            <div className="d-flex h-100 justify-content-center">
                <div className="my-auto" >
                    <Spinner animation="border" size={size} role="status"/>
                    {content && 
                    <span className="ml-3">{content}</span>}
                </div>
            </div>
        </Container>
    )
}

export default LoadingComponent
