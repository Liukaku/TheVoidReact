import React, { Fragment } from 'react'
import NoImage from '../images/no-image.webp'
import PropTypes from 'prop-types'

//mui
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Skeleton from '@material-ui/lab/Skeleton';

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
        marginBottom: 7
    },
    date:{
        width: 30,
        height: 10,
        backgroundColor: '#D3D3D3',
        marginBottom: 7
    },
    fullLine: {
        width: 190,
        height: 15,
        backgroundColor: '#A9A9A9',
        marginBottom: 7
    },
    halfLine: {
        width: 45,
        height: 15,
        backgroundColor: '#C0C0C0',
        marginBottom: 7
    }
})

const ScreamSkeleton = (props) => {
    const { classes } = props

    const content = Array.from({ length: 5}).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cardImage} image={NoImage}/>
            <CardContent className={classes.cardContent}>
                <Skeleton variant="square" className={classes.handle} />
                <Skeleton variant="text" className={classes.date} />
                <Skeleton variant="text" className={classes.fullLine} />
                <Skeleton variant="text" className={classes.fullLine} />
                <Skeleton variant="text" className={classes.halfLine} />
            </CardContent>
        </Card>
    ))

    return  <Fragment>{content}</Fragment>
}

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ScreamSkeleton);