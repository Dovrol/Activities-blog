import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup} from 'react-bootstrap';
import { Activity } from '../models/Activity';
import NavBar from './layout/NavBar';
import ActivityDashboard from './activites/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(response =>{
      setActivities(response.data);
    });
  }, [])

  function handleSelectedActivity(id : string){
      setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelActivity(){
    setSelectedActivity(undefined);
  }

  function handleChangeEditMode(isEditMode : boolean){
    setEditMode(isEditMode);
  }

  function createOrEditActivity(activity : Activity){
    activity.id ?
    setActivities([...activities.filter(x => x.id !== activity.id), activity]) :
    setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(undefined);
  }

  function deleteActivity(activity: Activity){
    setActivities([...activities.filter(x => x.id !== activity.id)]);
    setSelectedActivity(undefined);
  }

  return (
    <div>
      <NavBar changeEditMode={handleChangeEditMode}></NavBar>
      <Container className="mt-5">
        <ActivityDashboard activities={activities} 
                  selectedActivity={selectedActivity}
                  isEditMode={editMode}
                   selectActivity={handleSelectedActivity}
                   cancelActivity={handleCancelActivity}
                   changeEditMode={handleChangeEditMode}
                   createOrEditActivity={createOrEditActivity}
                   deleteActivity={deleteActivity} />
      </Container>
    </div>
  );
}

export default App;
