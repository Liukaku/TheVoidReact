import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteScream } from '../../redux/actions/dataActions'

//Materia UI imports
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

import MyButton from '../../util/MyButton';

const styles = {
    deleteButton: {
        float: "right",
        padding: "0px"
    },
}

class DeleteScream extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open : true })
    }

    handleClose = () => {
        this.setState({ open : false })
    }

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open : true })
        window.location.reload()
        this.handleClose()
    }

    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <MyButton tip="Delete this Scream" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Are you sure you wish to delete this? This cannot be undone once deleted
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteScream} color="secondary">
                            Delete Scream
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream : PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, { deleteScream})(withStyles(styles)(DeleteScream))
