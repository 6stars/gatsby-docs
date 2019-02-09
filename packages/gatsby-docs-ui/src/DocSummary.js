import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Launch from '@material-ui/icons/Launch'
import { Link } from 'gatsby'
import moment from 'moment'
import DocTags from './DocTags'
import DocInfo from './DocInfo'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  card: {
    width: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    objectFit: 'cover',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light,
  },
  coverTitle: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    padding: '20px 15px 10px 15px',
  },
})

class DocSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: true,
      expanded: false,
    }
    this.handleResize = this.handleResize.bind(this)
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    if (window.innerWidth >= 640) {
      this.setState({ mobile: false })
    } else {
      this.setState({ mobile: true })
    }
  }

  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { docInfo, classes, config } = this.props
    const {
      path,
      tags,
      category,
      description,
      title,
      formattedDate,
      timeToRead,
      slug,
      cover,
      excerpt,
    } = docInfo
    // const { mobile } = this.state;
    // const expand = mobile;
    /* eslint no-undef: "off" */
    // const coverHeight = mobile ? 162 : 225;
    const ADMIN_EDIT_PAGE_URL = '/admin/#/collections/docs/entries/'
    const coverIsImg = cover.endsWith('.jpg') || cover.endsWith('.png')
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {title.substring(0, 1)}
            </Avatar>
          }
          action={
            <Tooltip title="Edit this Doc" placement="top">
              <IconButton
                href={`${ADMIN_EDIT_PAGE_URL}${slug}`}
                target="_blank"
                aria-label="EditDoc"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          }
          title={title.toUpperCase()}
          subheader={`${formattedDate} - ${timeToRead} min read`}
        />
        {coverIsImg && (
          <CardMedia className={classes.media} image={cover} title={title} />
        )}
        {!coverIsImg && (
          <div className={classes.coverTitle}>
            <Typography
              component="h2"
              variant="h3"
              color="secondary"
              gutterBottom={true}
            >
              {cover}
            </Typography>
          </div>
        )}
        <CardContent>
          <Typography component="p">{description}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Link style={{ textDecoration: 'none' }} to={path}>
            <Button size="small" color="primary">
              Read
            </Button>
          </Link>
          <DocTags tags={tags} />
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography component="p">{excerpt}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

export default withStyles(styles)(DocSummary)
