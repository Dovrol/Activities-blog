import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useStore } from '../../../stores/store'
import LoadingComponent from '../../layout/LoadingComponent'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'


const ActivityDashboard = () => {
    const { activityStore } = useStore();
    const {activityRegistry, loadActivities} = activityStore;

    useEffect(() => {
      if (activityRegistry.size <= 1) loadActivities();
      }, [activityRegistry, loadActivities]);
    
    if (activityStore.loadingInitial) {
      return <LoadingComponent content='Loading activities' size="lg"/>
    }
    
    return (
        <Container className="p-4  my-2">
            <Row>
                <Col>
                    <ActivityList />
                </Col>
            </Row>
        </Container>
    )
}

export default observer(ActivityDashboard)
