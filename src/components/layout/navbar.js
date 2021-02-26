import React, { Component, Fragment, useState } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import PostScream from '../scream/PostScream'
import Notifications from './Notifications'
import { loginUserNavbar } from '../../redux/actions/userActions'
import '../../index.css'


//Material UI 
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';

//icons
import HomeIcon from '@material-ui/icons/Home'
import NotificationIcon from '@material-ui/icons/Notifications'

const styles = theme => ({
    ...theme.pageStyles,
    textField:{
        maxWidth: "190px",
        marginRight: "20px",
        color: "#fff"
    },
    loginForm:{
        minWidth: "500px",
        color: '#fff !important',
        float: 'right',
        marginRight: '80px'
    },
    wrapperDiv:{
        width: "100vw",
        
    },
    navContainer:{
        padding: "0px",
    },
    navButtons: {
        margin: "auto",
        marginLeft: "46vw"
    },
    loginSubmitButtonDisabled:{
        color: '#777',
        borderColor: '#777',
    },
    MuiInputLabel:{
        color: '#777'
    }

})

class NavBar extends Component {
    constructor(){
    super();
    this.state = {
        email: '',
        password: '',
        disabled: true,
        loading: false,
        errors: {}
    }
}

func(){/* 
    static getDerivedStateFromProps(nextProps){
        if(nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }
*/}



    handleSubmit = (event) => {
        event.preventDefault();


        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        
        this.props.loginUserNavbar(userData, this.props.history);

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

        if (this.state.email && this.state.password !== '') {
            this.setState({
                disabled: false
            })
        } else {
            this.setState({
                disabled: true
            })
        }
    }

    render() {
        const { errors, loading, disabled } = this.state;
        const { authenticated, classes, } = this.props
        return (
            <AppBar>
                <Toolbar className="navContainer">
                    {authenticated ? (
                        <Fragment>
                            <PostScream/>
                            <Link to="/">
                                <MyButton tip="Return Home">
                                    <HomeIcon color="secondary"/>
                                </MyButton>
                            </Link>
                            <Notifications/>
                        </Fragment>

                    ) : (
                        <div className={classes.wrapperDiv}>
                    <form noValidate onSubmit={this.handleSubmit} className={classes.loginForm}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            variant="filled"
                            fullWidth 
                            helperText={errors.email} 
                            error={errors.email ? true : false}
                        />
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            variant="filled"
                            fullWidth 
                            helperText={errors.password} 
                            error={errors.password ? true : false}
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.errorMessage}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="outlined" 
                            color="secondary" 
                            classes={{root: "submitButtonNav", disabled: "loginSubmitButtonDisabled"} }
                            disabled={disabled}
                        >
                            Login
                            {loading && (
                                <CircularProgress className={classes.loadingSpinner} size={30}/>
                            )}
                        </Button>
                    </form>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    loginUserNavbar: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

const mapActionsToProps =  {
    loginUserNavbar
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NavBar));
