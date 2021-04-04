import React , {Fragment} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import Header from './components/Header'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NotFound from './pages/404'
//import {isAuth} from './cores/ApiUser'
import IsLoggedIn from './cores/IsLoggedIn'
import IsNotLoggedIn from './cores/IsNotLoggedIn'

const App = () => {
  return (
    <Router>
      <Fragment>
        {/* <Header /> */}
        <Switch>
          <IsLoggedIn path={"/"} exact component={Home} />
          <IsLoggedIn path={"/chat"} exact component={Chat} />
          
          <IsLoggedIn path={"/profile"} exact component={Profile} />

          <IsNotLoggedIn path={"/login"} exact component={Login} />
          <IsNotLoggedIn path={"/register"} exact component={Register} />

          <Route path={"*"} name="Not found" exact component={NotFound} />    
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
