import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getScream, likeScream, unlikeScream, clearErrors } from '../../redux/actions/dataActions';
import Comments from './Comments';
import CommentForm from './CommentForm'
import dayjs from 'dayjs'

import { connect } from 'react-redux';

//mui
import { useTheme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles'
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MyButton from '../../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat'
import Liked from '@material-ui/icons/Favorite'
import NotLiked from '@material-ui/icons/FavoriteBorder'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = (theme) => ({
    ...theme.pageStyles,
    closePostBox:{
        position: "absolute",
        width: "5%",
        padding: "5px",
        right: "0px"
      },
    dialogContent: {
        overflow: "hidden"
    },
    profileImage:{
        borderRadius: "50%",
        height: "70px",
        maxWidth: "70px",
        objectFit: "cover",
    },
    userHandleText: {
        verticalAlign: "top",
        fontSize: "3.2rem",
    },
    postTextArea:{
        paddingTop: "2%",
        paddingBottom: "5%",
    },
    likeButtonIcon:{
        padding: "0px",
        paddingLeft: "10px",
        paddingRight: "10px",
        float: "right"
    },
    postDetails:{
        display: "flex"
    },
    postDetails2:{
        margin: "auto",
        display: "flex",
        width: "100%"
    },
    likeAndComments:{
        display: "flex",
        float: "right",
        width: "40%",
    },
    spacer:{
        width: "20%"
    },
    buttonSpacing: {
        width: "50%",
        margin: "0 25% 0 17%"
    },
    textSpacer: {
        marginRight: "10%"
    }
})


class ScreamDialog extends Component {
    state = {
        open: false,
        commentForm: false,
        oldPath : '',
        newPath : '',
    }

    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, screamId } = this.props

        const newPath = `/users/${userHandle}/scream/${screamId}`

        if(oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null, null, newPath)

        this.setState({ open: true, oldPath, newPath })
        this.props.getScream(this.props.screamId)
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false})
        this.props.clearErrors();
    }

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

    toggleReply = () => {
        if (this.state.commentForm == false) {
            this.setState({ commentForm : true })
        } else {
            this.setState({ commentForm : false })
        }
    }


    render() {
        const { classes, scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, UI: {loading }, authenticated, user} = this.props;


        const likeButton = !authenticated ? (
            <MyButton btnClassName={classes.likeButtonIcon} tip="like the post">
                <Link to="/login">
                    <NotLiked color="primary"/>
                </Link>
            </MyButton>
            ) : (
                this.likedScream() ? (
                    <MyButton tip="unlike the post" btnClassName={classes.likeButtonIcon} onClick={this.unlikeScream}>
                        <Liked color="primary"/>
                    </MyButton>
                ) : (
                    <MyButton tip="like the post" btnClassName={classes.likeButtonIcon} onClick={this.likeScream}>
                        <NotLiked color="primary"/>
                    </MyButton>
                )
            );

        const dialogMarkup = loading ? ( <CircularProgress size={200}/> ) : ( 
            <Grid container spacing={1}>
                <Grid item sm={12}>
                    <img src={userImage} alt="profile picture" className={classes.profileImage}/>
                    <Typography component={Link} variant="h4" color="primary" className={classes.userHandleText} to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body1" color="primary" className={classes.postTextArea}>
                        {body}
                    </Typography>
                    <hr/>
                    <div className={classes.postDetails}>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, YYYY MMMM DD')}
                        </Typography>
                        <div className={classes.spacer}></div>
                        <div className={classes.likeAndComments}>
                            
                            <span className={classes.textSpacer}>{likeCount} likes</span>

                            <span>
                                {commentCount} comments
                            </span>
                        </div>
                    </div>
                    <hr/>
                        <div  className={classes.postDetails}>
                            <div className={classes.postDetails2}>
                                <div className={classes.buttonSpacing}>
                                    {likeButton}
                                </div>
                                <div  className={classes.buttonSpacing}>
                                    <MyButton btnClassName={classes.likeButtonIcon} onClick={this.toggleReply}  tip="comments">
                                        <ChatIcon color="primary"/>
                                    </MyButton>
                                </div>
                            </div>
                        </div>
                    <hr/>
                    {this.state.commentForm === false  ? null : (<CommentForm screamId={screamId} />)}
                
                </Grid>
                <Comments comments={comments}/>
            </Grid>
        )

        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="open the scream for details" tipClassName={classes.expandButton} btnClassName={classes.screamDialogToggle}>
                    <ChatIcon color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="close" onClick={this.handleClose} tipClassName={classes.closePostBox}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream,
    likeScream,
    unlikeScream,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));