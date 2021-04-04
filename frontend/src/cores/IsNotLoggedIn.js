import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuth} from './ApiUser'

const IsNotLoggedIn = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => !isAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{pathname: "/", state: {from: props.location} }} />
    )
  }/>
)

export default IsNotLoggedIn
