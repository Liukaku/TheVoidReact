import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

//mui
import withStyles from '@material-ui/core/styles/withStyles'
import MatLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

//icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'

const styles = (theme) => ({
    ...theme.pageStyles,
    editButton: {
        zIndex: "2",
        position: "absolute",
    },
    editSVG: {
        stroke: "white",
    }
});

const StaticProfile = (props) => {
    const { classes, profile: { handle, createdAt, imageURL, bio, website, location } } = props;

    return(
        <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div>
                    <img className={classes.profileImage} src={imageURL} alt="profile image"/>

                    </div>
                    <div className={classes.profileDetails}>
                        <MatLink component={Link} to={`/user/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MatLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                            <LocationOn color="primary"/> <span>{location}</span>
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <br/>
                                <LinkIcon color="primary"/> 
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                            </Fragment>
                        )}
                        <br/>
                        {(
                            <Fragment>
                            <CalendarToday color="primary"/>
                            {' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                        </Fragment>
                        )}
                    </div>
                </div>

            </Paper>
    )

}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StaticProfile)
