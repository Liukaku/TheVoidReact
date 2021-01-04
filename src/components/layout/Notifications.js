import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../../util/MyButton';
import { markNotificationsRead } from '../../redux/actions/userActions'

//mui
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/ToolTip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

//icon
import NotificationIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

class Notifications extends Component{
    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({ anchorEl: event.target })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
        console.log(this.state);
    }

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications.filter((not) => !not.read).map((not) => not.notificationId);

        this.props.markNotificationsRead(unreadNotificationsIds)
    }
    
    render(){
        const notifications = this.props.notifications
        const anchorEl = this.state.anchorEl

        dayjs.extend(relativeTime);

        let notificationIcon;
        if(notifications && notifications.length > 0){
            notifications.filter(not => not.read === false).length > 0
             ? notificationIcon = (
                 <Badge badgeContent={notifications.filter(not => not.read === false).length} color="secondary">
                     <NotificationIcon color="secondary"/>
                </Badge>
             ) : (notificationIcon = <NotificationIcon/>)
    } else {
        notificationIcon = <NotificationIcon/>
    }

    let notificationsMarkup = 
        notifications && notifications.length > 0 ? (
            notifications.map(not => {
                const verb = not.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(not.createdAt).fromNow();
                const iconColour = not.read ? 'primary' : 'secondary';
                const icon = not.type === 'like' ? (
                    <FavoriteIcon color={iconColour} style={{ marginRight: 10 }}/>
                ) : (
                    <ChatIcon color={iconColour} style={{ marginRight: 10 }}/>
                )

                return(
                    <MenuItem key={not.notificationId} onClick={this.handleClose}>
                        {icon}
                        <Typography component={Link}
                                    color="primary"
                                    variant="body1"
                                    to={`users/${not.recipient}/scream/${not.screamId}`} >
                                    {not.sender} {verb} your scream {time}
                        </Typography>
                    </MenuItem>
                    
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                No notifications
            </MenuItem>
        )
    return (
        <Fragment>
            <ToolTip placement="top" title="notifications">
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} 
                    aria-haspopup="true"
                    onClick={this.handleOpen}>
                        {notificationIcon}
                    </IconButton>
            </ToolTip>
            <Menu anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                onEntered={this.onMenuOpened}> 
                {notificationsMarkup}
            </Menu>
        </Fragment>
    )
}
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications)