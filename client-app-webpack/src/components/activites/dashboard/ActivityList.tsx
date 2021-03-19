import React from 'react'
import { Badge, Button, ButtonGroup, Card, CardDeck, Col, ListGroup } from 'react-bootstrap'
import { Activity } from '../../../models/Activity'

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (activity: Activity) => void;
}



const ActivityList = ({ activities, selectActivity, deleteActivity }: Props) => {
    return (
        <>
            {activities.map(activity => (
                <CardDeck key={activity.id}>
                    <Card className="my-2">
                        <Card.Body>
                            <Card.Title>{activity.title} <Badge variant="info mx-2">{activity.category}</Badge></Card.Title>
                            <Card.Text>{activity.description}</Card.Text>
                            <div className="d-flex justify-content-between">
                                <Card.Text>{activity.venue} {activity.city}</Card.Text>
                                <div>
                                    <Button className="mr-3" variant="danger" onClick={()=> deleteActivity(activity)}>Delete</Button>
                                    <Button onClick={()=> selectActivity(activity.id)}>View</Button>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Footer><small className="text-muted">{activity.date}</small> </Card.Footer>
                    </Card>
                </CardDeck>
            ))}
        </>
    )
}

export default ActivityList
