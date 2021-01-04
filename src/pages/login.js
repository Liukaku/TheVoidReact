import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Link } from "react-router-dom";
import AppIcon from '../images/icon.png'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextareaAutosize } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

import axios from 'axios'

//redux
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = theme => ({
    ...theme.pageStyles
})



export class login extends Component {
    //controlled component form handling
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();


        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        
        this.props.loginUser(userData, this.props.history);

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;

        return (
            <div className={classes.formFormat}>
                <img src={AppIcon} alt="the void image" className={classes.pageLogo}/>
                <Typography variant="h1" className={classes.pageTitle}>
                    Login Page
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        value={this.state.email} 
                        onChange={this.handleChange} 
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
                        fullWidth 
                        helperText={errors.password} 
                        error={errors.password ? true : false}
                    />
                    {errors.general && (
                        <Typography variant="body2" className={classes.errorMessage}>
                            {errors.general}
                        </Typography>
                    )}
                        {errors.error == "auth/too-many-requests" ? (
                            <Typography variant="body2" className={classes.errorMessage}>
                                There have been too many incorrect login attempts, please wait 10 minutes and try again.
                            </Typography>
                        ) : errors.error ? (
                            <Typography variant="body2" className={classes.errorMessage}>
                            The email and password that you entered did not match our records. Please double-check and try again.
                            </Typography>
                        ) : (
                            <Typography/>
                        )}
                    <Button 
                        type="submit" 
                        variant="outlined" 
                        color="secondary" 
                        className={classes.submitButton}
                        disabled={loading}
                    >
                        Login
                        {loading && (
                            <CircularProgress className={classes.loadingSpinner} size={30}/>
                        )}
                    </Button>
                    <br/>
                    <small>Need an account? Sign Up <Link to="/signup">here</Link></small>
                </form>
            </div>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps =  {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
