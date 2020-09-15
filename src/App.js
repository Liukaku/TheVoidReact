import React from 'react';
import  { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'


import NavBar from './components/navbar'

import home from './pages/home'
import signup from './pages/signup'
import login from './pages/login'

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#303030',
      },
      main: '#311b92',
    },
    typography: {
      useNextVariants: true,
    }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <div className="AppDiv">
      <Router>
        <NavBar/>
          <div className="container">
            <Switch>
            <Route exact path="/" component={home}></Route>
            <Route exact path="/login" component={login}></Route>
            <Route exact path="/signup" component={signup}></Route>
          </Switch>
          </div>
      </Router>
    </div>
   </MuiThemeProvider>
  );
}

export default App;
