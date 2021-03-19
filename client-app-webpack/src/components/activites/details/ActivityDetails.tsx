import React from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { Activity } from '../../../models/Activity'

interface Props {
    activity: Activity;
    cancelActivity: () => void;
    changeEditMode: (isEditMode: boolean) => void;
}

const ActivityDetails = ({activity, cancelActivity, changeEditMode} : Props) => {
    return (
        <Card>
        <Card.Img variant="top" src={`src/Assets/categoryimages/${activity.category}.jpg`} />
        <Card.Body>
            <Card.Title>{activity.title}</Card.Title>
            <Card.Text>{activity.description}</Card.Text>
            <Button onClick={() => changeEditMode(true)} variant="outline-primary" block>Edit</Button>
            <Button onClick={cancelActivity} variant="outline-danger" block>Cancel</Button>
        </Card.Body>
        </Card>
    )
}

export default ActivityDetails
