import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AppIcon from '../images/icon.png'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { TextareaAutosize } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

import axios from 'axios'

// redux
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = theme => ({
  ...theme.pageStyles,
  formFormat: {
    marginLeft: '70%',
    marginTop: '15%',
    width: '75vw',
    backgroundColor: '#fff',
    borderRadius: '2px',
    textAlign: 'center',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    padding: '20px'
  },
  screamingAbout: {
    textAlign: 'left'
  },
  logButton: {
    marginBottom: '30px'
  },
  regButton: {
    width: '92.35px'
  }
})

export class Welcome extends Component {
  // controlled component form handling
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  render () {
    const { errors } = this.state
    const { classes, UI: { loading } } = this.props

    return (
      <div className={classes.formFormat}>
        <img src={AppIcon} alt='the void image' className={classes.pageLogo} />
        <div className={classes.loginAndRegisterButtons}>
          <div>
            <h2 className={classes.screamingAbout}>
              See what your everyone is screaming about
            </h2>
            <h4 className={classes.screamingAbout}>
              Scream into the void today!
            </h4>
            <Link to='/signup'>
              <Button
                type='button'
                variant='outlined'
                color='secondary'
                className={classes.logButton}
                disabled={loading}
              >
                Sign up
                {loading && (
                  <CircularProgress className={classes.loadingSpinner} size={30} />
                )}
              </Button>
            </Link>
          </div>
          <div>
            <Link to='/login'>
              <Button
                type='button'
                variant='outlined'
                color='secondary'
                className={classes.regButton}
                disabled={loading}
              >
                Login
                {loading && (
                  <CircularProgress className={classes.loadingSpinner} size={30} />
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Welcome))
