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

const styles = {
    formFormat: {
        marginLeft: 'auto',
        backgroundColor: '#fff',
        borderRadius: '2px',
        textAlign: 'center',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        padding: '20px',
    },
    pageTitle: {
        fontSize: '3rem'
    },
    pageLogo: {
        height: '64px',
        width: '64px',
    },
    textField: {
        marginBottom: '20px'
    },
    submitButton: {
        color: '#6a22a1',
        border: '1px solid #6a22a1',
        marginTop: '10px'
    },
    errorMessage: {
        color: 'red',
        fontSize: '0.8rem',
        margin: '10px'
    },
    loadingSpinner:{
        position: 'absolute'
    }
}



export class login extends Component {
    //controlled component form handling
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data);
                this.setState({
                    loading: false
                })
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { errors, loading } = this.state;
        const { classes } = this.props;

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
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
