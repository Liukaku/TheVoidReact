import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";

//Material UI 
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

export class NavBar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="navContainer">
                    <Button color='inherit' component={Link} to="/login">Login</Button>
                    <Button color='inherit' component={Link} to="/">Home</Button>
                    <Button color='inherit' component={Link} to="/signup">Sign up</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar