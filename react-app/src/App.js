import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import Splash from './components/Splash/Splash';
import Footer from './components/Footer/Footer';
import Request from './components/Request/Request';
import Offer from './components/Offer/Offer';
import NewReview from './components/NewReview/NewReview';
import SingleOffer from './components/SingleOffer/SingleOffer';
import SingleRequest from './components/SingleRequest/SingleRequest';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import UserPage from './components/UserPage/UserPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/requests' exact={true} >
          <Request />
        </ProtectedRoute>
        <ProtectedRoute path='/requests/:requestId' exact={true} >
          <SingleRequest />
        </ProtectedRoute>
        <ProtectedRoute path='/reviews/add' exact={true} >
          <NewReview />
        </ProtectedRoute>
        <ProtectedRoute path='/offers' exact={true} >
          <Offer />
        </ProtectedRoute>
        <ProtectedRoute path='/offers/:offerId' exact={true} >
          <SingleOffer />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <UserPage />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Splash />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
