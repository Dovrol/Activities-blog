import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react';
import { Alert, Card, CardGroup } from 'react-bootstrap';
import { Header, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../models/Activity';
import { useStore } from '../../../stores/store';
import ActivityListItem from './ActivityListItem';

const ActivityList = () => {
    const { activityStore } = useStore();

    return (
        <>
            {activityStore.activityDateGroup.map(([date, activities]) => (
                <Fragment key={date}>
                    {/* <Alert key={date} variant='success'>{date}</Alert> */}
                    <Header>{date}</Header>
                    {activities.map((activity, i) => (
                        <Segment key={i}>
                            <Item.Group>
                                <ActivityListItem activity={activity} />
                            </Item.Group>
                        </Segment>
                    ))}
                </Fragment>
            ))}
        </>
    )
}

export default observer(ActivityList)
