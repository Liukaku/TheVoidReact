import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import ProfileSkeleton from '../../util/ProfileSkeleton'


//mui
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MatLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip';

//icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';


//redux
import { connect } from 'react-redux'
import { logoutUser, uploadImage } from '../../redux/actions/userActions'



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

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click()
    }
    handleLogout = () => {
        console.log("butotn pressed");
        this.props.logoutUser();
    }

    render() {
        const { classes, user: { credentials: {handle, createdAt, imageURL, bio, website, location }, loading, authenticated }} = this.props

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div>
                        <Tooltip title="Upload Profile Picture" arrow>
                            <IconButton onClick={this.handleEditPicture} className={classes.editButton}>
                                <EditIcon color="primary" className={classes.editSVG}/>
                            </IconButton>
                        </Tooltip>
                    <img className={classes.profileImage} src={imageURL} alt="profile image"/>
                    <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>

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
                        <EditDetails/>
                        <Tooltip title="logout" arrow>
                            <IconButton onClick={this.handleLogout}>
                            <ExitToAppIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                </div>

            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    Please log in to view user profiles
                    <div className={classes.buttons}>
                        <Button variant="outlined" color="primary" component={Link} to="/login">Login</Button>
                        <Button variant="outlined" color="secondary" component={Link} to="/signup">Signup</Button>
                    </div>
                </Typography>
            </Paper>
        )) : ( <ProfileSkeleton/>)

        return profileMarkup
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
