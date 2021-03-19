import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/Activity';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(response =>{
      setActivities(response.data);
    });
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
        {activities.map(activity => (
        <List.Item>          
          {activity.title}   
        </List.Item>
        ))}
    </div>
  );
}

export default App;