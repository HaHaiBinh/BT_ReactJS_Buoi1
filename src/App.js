import React, { Suspense } from 'react';
import NotFound from './components/NotFound';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import productApi from 'api/productApi';
import SignIn from 'features/Auth/pages/SignIn';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Lazy load - Code splitting
const Photo = React.lazy(() => import('./features/Photo'));

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

function App() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      const params = {
        _page: 1,
        _limit: 5,
      };
      try {
        const response = await productApi.getAll(params);
        console.log('response: ', response);
        setProductList(response.data);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    fetchProductList();
  }, []);

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Handle firebase auth changed: Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        // setIsSignedIn(!!user);
        if (!user) {
          // user logout -> handle something here
          console.log('User is logout');

          return;
        }
        console.log('Login user', user.displayName);
        const token = await user.getIdToken();
        console.log('Token user', token);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
