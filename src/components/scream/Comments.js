import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

//MUI
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
    ...theme.pageStyles,
    commentProfileImage: {
        borderRadius: "50%",
        height: "70px",
        maxWidth: "70px",
        minWidth: "70px",
        objectFit: "cover",
    },
    commentText: {
        marginBottom: "5%",
        marginLeft: "28px",
        width: "100%",
    },
    commentUserHandle:{
        color: "#5a5a5a"
    },
    hrSpace:{
        width: "100%",
    },
    commentContainer:{
        width: "100%",
    },
    
})

class Comments extends Component{


    render() {
        const { comments, classes } = this.props
        return (
            <Grid className={classes.commentContainer}>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment
                    return(
                        <Fragment key={createdAt} >
                            <Grid item xl={12} >
                                <Grid container >
                                    <Grid item xs={1} className={classes.imageContainer}>
                                        <img src={userImage} alt="Comment Profile Image" className={classes.commentProfileImage} />
                                    </Grid>
                                    <Grid item >
                                        <div className={classes.commentText}>
                                            <Typography variant="h6" component={Link} to={`/users/${userHandle}`} className={classes.commentUserHandle}>
                                                {userHandle}
                                            </Typography>
                                            <Typography varient="body1" >
                                                {body}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, YYYY MMMM DD')}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                {index !== comments.length - 1 && (
                                    <hr className={classes.hrSpace}/>
                                )}
                            </Grid>
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);