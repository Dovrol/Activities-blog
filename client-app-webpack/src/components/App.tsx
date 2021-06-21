import React from 'react';
import { Container} from 'react-bootstrap';
import NavBar from './layout/NavBar';
import ActivityDashboard from './activites/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from './homePage/HomePage';
import ActivityForm from './activites/form/ActivityForm';
import ActivityDetails from './activites/details/ActivityDetails';
import LoginForm from './users/LoginForm';

function App() {
  const location = useLocation();


  return (
    <div>
        <Route exact path='/' component={HomePage}/>
      <Route
      path='/(.+)'
      render={()=>
        <>
        <NavBar/>
        <Container className="mt-5">
          <Route exact path='/activities' component={ActivityDashboard}/>
          <Route path='/activities/:id' component={ActivityDetails}/>
          <Route key={location.key} path={['/createActivity', '/manageActivity/:id']} component={ActivityForm}/> 
          <Route path='/login' component={LoginForm} /> 
        </Container>
        </>
      }
      />
    </div>
  );
}

export default observer(App);
