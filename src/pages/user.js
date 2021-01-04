import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Scream from '../components/scream/Scream'
import { connect } from 'react-redux'
import { getUserDetails } from '../redux/actions/dataActions'
import StaticProfile from '../components/profile/StaticProfile'
import ScreamSkeleton from '../util/ScreamSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

//mui
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.pageStyles,
});

class user extends Component {
    state = {
        profile: null,
        screamIdParam: null
    }

    componentDidMount(){
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId

        if(screamId) {
            this.setState({screamIdParam: screamId})
        }

        this.props.getUserDetails(handle);
        
        axios.get(`/user/${handle}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        const { screams, loading } = this.props.data;
        const { screamIdParam } = this.state;
        const { classes } = this.props;
        
        const screamsMarkup = loading ? (
            <ScreamSkeleton/>
        ) : screams === null ? (
            <p> They have not screamed yet </p>
        ) : !screamIdParam ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
        ) : (
            screams.map(scream => {
                if(scream.screamId !== screamIdParam)
                    return <Scream key={scream.screamId} scream={scream}/>
                else return <Scream key={scream.screamId} scream={scream} openDialog/>
            })
        )

        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item sm={8} xs={12}>
                        {screamsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        {this.state.profile === null ? (
                            <ProfileSkeleton/>
                        ) : 
                        (
                            <StaticProfile profile={this.state.profile}/>
                        )}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserDetails})(withStyles(styles)(user))
