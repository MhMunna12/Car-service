
import './App.css';
import Home from './component/Home/Home';
import Header from './component/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RiderDetails from './component/RiderDetails/RiderDetails';
import CarDetailsNotMatch from './component/CarDetailsNotMatch/CarDetailsNotMatch';
import Login from './component/Login/Login';

import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import Destination from './component/Destination/Destination';
import Contact from './component/Contact/Contact';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      
      <Router>
        <Header/>
          <Switch>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <PrivateRoute path="/rider/:riderName">
              <RiderDetails/>
            </PrivateRoute>
            <PrivateRoute path="/destination">
              <Destination/>
            </PrivateRoute>
            <PrivateRoute path="/contact">
              <Contact/>
            </PrivateRoute>
            <Route path="/">
              <Home/>
            </Route>
            <Route path="*">
              <CarDetailsNotMatch/>
            </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
