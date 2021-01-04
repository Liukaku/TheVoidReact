import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

//redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions'

//MUI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
    ...theme.pageStyles,
    postButtonDisabled: {
        float: "right",
    },
    postButton: {
        float: "right",
    }
})

class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: "" })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const newComment = {
            body: this.state.body
        }

        this.props.submitComment(this.props.screamId, newComment);
        console.log(this.state);
    }

    render() {
        const { classes, authenticated, UI: { loading } } = this.props
        const errors = this.state.errors
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on field"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        classes={classes.textField}/>
                                {this.state.body === ''  ? (
                                    <Button type="submit" variant="contained" className={classes.postButtonDisabled} disabled={loading} disabled>
                                        Reply
                                        
                                    </Button>
                                ) : (
                                    <Button type="submit" variant="contained" className={classes.postButton} disabled={loading}>
                                    Reply
                                    
                                </Button>
                                )}
                            
                </form>
            </Grid>
        ) : null;
        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm));
