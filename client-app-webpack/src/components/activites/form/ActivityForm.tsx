import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Form, Spinner } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import { useStore } from '../../../stores/store'
import LoadingComponent from '../../layout/LoadingComponent'
import {LinkContainer} from 'react-router-bootstrap'
import { v4 as uuid } from 'uuid';
import { Activity } from '../../../models/Activity'


const ActivityForm = () => {
    
    const {activityStore} = useStore();
    const history = useHistory();
    
    const initialState  = {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) {
            activityStore.loadActivity(id).then(activity => setActivity(activity!));
        }

    }, [id, activityStore.loadActivity])


    let handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    let handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id : uuid()
            }
            activityStore.createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            activityStore.updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    if (activityStore.loadingInitial) return <LoadingComponent/>

    return (
        <Card className="p-3 my-2">
            <Form onSubmit={handleSubmit}>
                <Form.Label>Edit Activity</Form.Label>
                <Form.Group className="my-3">
                    <Form.Control className="my-1" placeholder="Title" name="title" value={activity.title} onChange={handleFormChange} />
                    <Form.Control className="my-1" type="date" placeholder="date" name="date" value={activity.date} onChange={handleFormChange} />
                    <Form.Control className="my-1" placeholder="description" name="description" value={activity.description} onChange={handleFormChange} />
                    <Form.Control className="my-1" placeholder="category" name="category" value={activity.category} onChange={handleFormChange} />
                    <Form.Control className="my-1" placeholder="city" name="city" value={activity.city} onChange={handleFormChange} />
                    <Form.Control className="my-1" placeholder="venue" name="venue" value={activity.venue} onChange={handleFormChange} />
                </Form.Group>
                <div className="d-flex justify-content-around">
                    <LinkContainer to={`/activities/${activity.id}`}>
                        <Button  className="float-left" variant="danger" type="submit">Cancel</Button>
                    </LinkContainer>
                    <Button className="float-left" variant="success" type="submit">
                        {activityStore.loading ? <LoadingComponent content="" size="sm"/> : "Submit"}
                    </Button>
                </div>
            </Form>
        </Card>
    )
}

export default observer(ActivityForm)
