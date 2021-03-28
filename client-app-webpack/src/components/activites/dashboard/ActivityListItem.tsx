import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'
import { Button, Icon, Item } from 'semantic-ui-react'
import { Activity } from '../../../models/Activity'
import { useStore } from '../../../stores/store'
import LoadingComponent from '../../layout/LoadingComponent'


interface Props {
    activity: Activity
}


const ActivityListItem = ({ activity }: Props) => {

    const [target, setTarget] = useState('');

    const { activityStore } = useStore();

    function handleDeleteSubmit(event: any, activity: Activity) {
        setTarget(event.currentTarget.name);
        activityStore.deleteActivity(activity);
    }

    return (
        <>
            <Item>
                <Item.Image size='tiny' src='src/Assets/user.png' />
                <Item.Content>
                    <Item.Header>{activity.title} <Badge variant="info mx-2">{activity.category}</Badge></Item.Header>
                    <Item.Meta>
                        <Icon name='clock'></Icon>
                            {activity.description}
                        </Item.Meta>
                    <Item.Description>
                        <Icon name='flag'></Icon>
                        {activity.venue} {activity.city}
                        </Item.Description>
                    {/* <Item.Extra>Additional Details</Item.Extra> */}

                    <Button.Group floated='right'>
                        <Button onClick={(e) => handleDeleteSubmit(e, activity)} 
                            loading={activityStore.loading && target == activity.id} color='red'>Delete</Button>
                        <Button.Or />
                        <Button as={NavLink} to={`/activities/${activity.id}`} color='blue'>View</Button>
                    </Button.Group>
                </Item.Content>
            </Item>
        </>
    )
}


export default observer(ActivityListItem)
