import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'

//Materia UI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat'
import Liked from '@material-ui/icons/Favorite'
import NotLiked from '@material-ui/icons/FavoriteBorder'
import ScreamDialog from './ScreamDialog'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream'

const styles = (theme) => ({
    ...theme.pageStyles,
    card: {
        display: 'flex',
        marginBottom: '10px',
    },
    userImage: {
        minHeight: "164px",
        height: "116px",
        minWidth: "164px",
        width: "116px",
        objectFit: "cover"
    },
    contentBox:{
        width: "100%"
    },

})

class Scream extends Component {
    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)) {
            return true
        } else {
            return false
        }
    }

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId)
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId)
    }

    render() {
        dayjs.extend(relativeTime)
        const { classes, scream : { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }, user:{ authenticated, credentials: { handle } } } = this.props
        const likeButton = !authenticated ? (
        <MyButton tip="like the post">
            <Link to="/login">
                <NotLiked color="primary"/>
            </Link>
        </MyButton>
        ) : (
            this.likedScream() ? (
                <MyButton tip="unlike the post" onClick={this.unlikeScream}>
                    <Liked color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="like the post" onClick={this.likeScream}>
                    <NotLiked color="primary"/>
                </MyButton>
            )
        );
        const deleteButton = authenticated && userHandle === handle ? ( <DeleteScream screamId={screamId}/>) : null;
        return (
            <Card className={classes.card} key={screamId}>
                <CardMedia
                className={classes.userImage}
                image={userImage}
                title="Profile Image"/>
                <CardContent className={classes.contentBox}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`}>
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    {likeButton}
                    <span>{likeCount} likes</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} authenticated={authenticated} user={this.props.user} openDialog={this.props.openDialog} />
                    <span>{commentCount} comments</span>
                    
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user,
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
