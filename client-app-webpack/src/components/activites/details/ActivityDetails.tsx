import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../stores/store';
import LoadingComponent from '../../layout/LoadingComponent';
import { LinkContainer } from 'react-router-bootstrap'
import { Grid } from 'semantic-ui-react';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

const ActivityDetails = () => {
    const { activityStore } = useStore();
    const { id } = useParams<{id: string}>();
    
    useEffect(() => {
        if (id)  activityStore.loadActivity(id);
    }, [id, activityStore.loadActivity])
    
    const {selectedActivity : activity} = activityStore;

    if (activityStore.loadingInitial || !activity) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar/>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails)
