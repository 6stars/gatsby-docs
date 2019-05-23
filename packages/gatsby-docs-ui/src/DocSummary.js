import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'gatsby'
import DocTags from './DocTags'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PageContext from './templates/pageContext'

const styles = theme => ({
  card: {
    width: 410,
    margin: 4,
  },
  media: {
    minHeight: 200,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    textAlign: 'center',
    margin: '0',
    minHeight: '230px',
    alignItems: 'center',
    padding: '0 30px',
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
    const { mobile } = this.state

    // const expand = mobile;
    /* eslint no-undef: "off" */
    const coverHeight = mobile ? 162 : 215
    const ADMIN_EDIT_PAGE_URL = '/admin/#/collections/docs/entries/'
    const coverIsImg =
      cover.endsWith('.gif') ||
      cover.endsWith('.jpeg') ||
      cover.endsWith('.jpg') ||
      cover.endsWith('.png')

    return (
      <PageContext.Consumer>
        {({ config }) => {
          return (
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Document" className={classes.avatar}>
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
              <Link style={{ textDecoration: 'none' }} to={path}>
                {coverIsImg && (
                  <CardMedia
                    className={classes.media}
                    image={`${config.pathPrefix}${cover}`}
                    title={title}
                  />
                )}
                {!coverIsImg && (
                  <div className={classes.coverTitle}>
                    <Typography
                      component="h2"
                      variant="h4"
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
              </Link>
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
        }}
      </PageContext.Consumer>
    )
  }
}

export default withStyles(styles)(DocSummary)
