import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles'

//Materia UI imports
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

const styles = {
    card: {
        display: 'flex',
        marginBottom: '10px',
    },
    userImage: {
        minHeight: "116px",
        height: "116px",
        minWidth: "116px",
        width: "116px",
        objectFit: "cover"
    }
}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, scream : { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } } = this.props
        return (
            <Card className={classes.card} key={screamId}>
                <CardMedia
                className={classes.userImage}
                image={userImage}
                title="Profile Image"/>
                <CardContent>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`}>
                        {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream)
