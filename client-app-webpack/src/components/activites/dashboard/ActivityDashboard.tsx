import React from 'react'
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Activity } from '../../../models/Activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props {
    activities: Activity[];
    selectedActivity : Activity | undefined;
    isEditMode: boolean;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    changeEditMode: (isEditMode: boolean) => void;
    createOrEditActivity: (activity : Activity) => void;
    deleteActivity : (activity: Activity) => void;
}


const ActivityDashboard = ({ activities, selectedActivity, isEditMode, selectActivity, cancelActivity, changeEditMode, createOrEditActivity, deleteActivity }: Props) => {
    return (
        <Container className="p-4  my-2">
            <Row>
                <Col lg={8}>
                    <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
                </Col>
                <Col lg={4}>
                    {selectedActivity && !isEditMode &&
                        <ActivityDetails activity={selectedActivity} cancelActivity={cancelActivity} changeEditMode={changeEditMode}/>
                    }
                    {isEditMode && 
                    <ActivityForm changeEditMode={changeEditMode} selectedActivity={selectedActivity} createOrEditActivity={createOrEditActivity}/>}
                </Col>
            </Row>
        </Container>
    )
}

export default ActivityDashboard
