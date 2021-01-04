import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { postScream } from '../../redux/actions/dataActions';

import { connect } from 'react-redux';

//mui
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MyButton from '../../util/MyButton';

const styles = (theme) => ({
    ...theme.pageStyles,
    closePostBox:{
        position: "absolute",
        width: "5%",
        padding: "5px"
      },
      postButton: {
        backgroundColor: '#6a22a1',
        color: "#fff",
        marginTop: '10px',
        float: 'right',
    }, 
    postButtonDisabled: {
      backgroundColor: '#6a22a1',
      color: "#grey",
      marginTop: '10px',
      float: 'right',
    },
    newScreamDialog: {
        top: '-470px !important', 
    },
})

class PostScream extends Component{
    state = {
        open: false,
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }

    handleOpen = () => {
        this.setState({ open: true})
    }

    handleClose = () => {
        this.setState({ open: false})
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const newPost = {
            body: this.state.body
        }

        this.props.postScream(newPost);
        this.handleClose();
        console.log(this.state);
    }

    render(){
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Scream into the void!">
                    <AddIcon color="secondary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm" className={classes.newScreamDialog}>
                    <MyButton tip="close" onClick={this.handleClose} tipClassName={classes.closePostBox}>
                        <CloseIcon/>
                    </MyButton>
                        <DialogContent>
                            <form onSubmit={this.handleSubmit}>
                                <TextField 
                                name="body" 
                                type="text" 
                                label="scream" 
                                multiline 
                                ows="3" 
                                placeholder="Enter your post here" 
                                error={errors.body ? true : false} 
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />

                                {this.state.body === ''  ? (
                                    <Button type="submit" variant="contained" className={classes.postButtonDisabled} disabled={loading} disabled>
                                        Post
                                        {loading && (<CircularProgress className={classes.postSpinner}/>)}
                                    </Button>
                                ) : (
                                    <Button type="submit" variant="contained" className={classes.postButton} disabled={loading}>
                                    Post
                                    {loading && (<CircularProgress className={classes.postSpinner}/>)}
                                </Button>
                                )}
                            </form>
                        </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, {postScream})(withStyles(styles)(PostScream))