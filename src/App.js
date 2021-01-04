import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import './home.css'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeObject from './util/theme'

// redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

import AuthRoute from './util/AuthRoute'
import NotAuth from './util/NotAuth'

import jwtDecode from 'jwt-decode'

import NavBar from './components/layout/navbar'

import home from './pages/home'
import Signup from './pages/signup'
import user from './pages/user'
import login from './pages/login'
import actualWelcome from './pages/actualWelcome'
import axios from 'axios'

const theme = createMuiTheme(themeObject)

axios.defaults.baseURL = 'https://europe-west1-lets-get-social-f2a5f.cloudfunctions.net/api'

const token = localStorage.FBToken

let decodedToken

if (token) {
  const decodedToken = jwtDecode(token)
  console.log(decodedToken)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common.Authorization = token
    store.dispatch(getUserData())
  }
}

const testVar = decodedToken

function App () {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar authState={token} />
          <div className='container'>
            <Switch>
              <NotAuth exact path='/home' component={home} />
              <AuthRoute exact path='/' component={actualWelcome} />
              <AuthRoute exact path='/login' component={login} />
              <AuthRoute exact path='/signup' component={Signup} />
              <Route exact path='/users/:handle' component={user} />
              <Route exact path='/users/:handle/scream/:screamId' component={user} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
