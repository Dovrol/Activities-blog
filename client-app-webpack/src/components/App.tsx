import React, { useEffect } from 'react';
import { Container} from 'react-bootstrap';
import NavBar from './layout/NavBar';
import ActivityDashboard from './activites/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from './homePage/HomePage';
import ActivityForm from './activites/form/ActivityForm';
import ActivityDetails from './activites/details/ActivityDetails';
import LoginForm from './users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './layout/LoadingComponent';
import ModalComponent from './utils/modals/ModalComponent';

function App() {
  const location = useLocation();
  const {commonStore, accountStore} = useStore();

  useEffect(() => {
      if (commonStore.token)
      {
        accountStore.getUser().finally(() => commonStore.setAppLoaded());
      } else {
        commonStore.setAppLoaded();
      }
  }, [accountStore, commonStore]);

  if (!commonStore.appLoaded) return <LoadingComponent />

  return (
    <>
      <ModalComponent/>
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
    </>
  );
}

export default observer(App);
