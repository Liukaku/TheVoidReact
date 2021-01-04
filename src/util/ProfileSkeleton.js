import React, { Fragment } from 'react'
import NoImage from '../images/no-image.webp'
import PropTypes from 'prop-types'

//mui
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Skeleton from '@material-ui/lab/Skeleton';

//icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = (theme) => ({
    ...theme.pageStyles,
    card: {
        display: 'flex',
        marginBottom: '10px',
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: "20"
    },
    cardImage: {
        minHeight: "164px",
        height: "116px",
        minWidth: "164px",
        width: "116px",
        objectFit: "cover"
    },
    handle:{
        width: 60,
        height: 20,
        backgroundColor: '#303030',
        marginBottom: 7,
        margin: 'auto',
    },
    date:{
        width: 30,
        height: 10,
        backgroundColor: '#D3D3D3',
        marginBottom: 7,
        margin: 'auto',
    },
    fullLine: {
        width: 190,
        height: 15,
        backgroundColor: '#A9A9A9',
        marginBottom: 7,
    },
    halfLine: {
        width: 45,
        height: 15,
        backgroundColor: '#C0C0C0',
        marginBottom: 7,
    },
    flexWrapping: {
        width: '54%',
        display: 'flex',
        margin: 'auto',
    }
})



const ProfileSkeleton = (props) => {
    const { classes } = props

    return (
    <Paper className={classes.paper}>
        <div className={classes.profile}>
            <div>
            <img className={classes.profileImage} src={NoImage} alt="profile image"/>
            </div>
            <div className={classes.profileDetails}>
                <Skeleton variant="square" className={classes.handle} />
                <hr/>
                <Skeleton variant="text" className={classes.date} />
                <hr/>
                <div className={classes.flexWrapping}>
                <LocationOn color="primary" />
                <Skeleton variant="text" className={classes.fullLine} />
                </div>
                <br/>
                <div className={classes.flexWrapping}>
                <LinkIcon color="primary" />
                <Skeleton variant="text" className={classes.fullLine} />
                </div>
                <br />
                <div className={classes.flexWrapping}>
                <CalendarToday color="primary" />
                <Skeleton variant="text" className={classes.fullLine} />
                </div>
                <br />

            </div>
        </div>
    </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,   
}

export default withStyles(styles)(ProfileSkeleton);