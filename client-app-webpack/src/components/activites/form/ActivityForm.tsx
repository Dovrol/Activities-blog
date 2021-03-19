import React, { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react'
import { Button, ButtonGroup, Card, Form } from 'react-bootstrap'
import { Activity } from '../../../models/Activity'

interface Props {
    changeEditMode: (isEditMode: boolean) => void;
    selectedActivity : Activity | undefined;
    createOrEditActivity: (activity : Activity) => void;
}

const ActivityForm = ({changeEditMode, selectedActivity, createOrEditActivity} : Props) => {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);
 
    let handleFormChange = (event :  ChangeEvent<HTMLInputElement>) => {
        let {name, value} = event.target;
        setActivity({...activity, [name]:value });
    }

    let handleSubmit = (event : FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        createOrEditActivity(activity);
    }

    return (
        <Card className="p-3 my-2">
            <Form onSubmit={handleSubmit}>
                <Form.Label>Edit Activity</Form.Label>
                <Form.Group className="my-3">
                    <Form.Control className="my-1" placeholder="Title" name="title" value={activity.title}  onChange={handleFormChange}/>
                    <Form.Control className="my-1" placeholder="date" name="date" value={activity.date}  onChange={handleFormChange}/>
                    <Form.Control className="my-1" placeholder="description" name="description" value={activity.description}  onChange={handleFormChange}/>
                    <Form.Control className="my-1" placeholder="category" name="category" value={activity.category}  onChange={handleFormChange}/>
                    <Form.Control className="my-1" placeholder="city" name="city" value={activity.city}  onChange={handleFormChange}/>
                    <Form.Control className="my-1" placeholder="venue" name="venue" value={activity.venue}  onChange={handleFormChange}/>
                </Form.Group>
                <div className="d-flex justify-content-around">
                    <Button onClick={() => changeEditMode(false)} className="float-left" variant="danger" type="submit">Cancel</Button>
                    <Button className="float-left" variant="success" type="submit">Submit</Button>
                </div>
            </Form>
        </Card>
    )
}

export default ActivityForm
