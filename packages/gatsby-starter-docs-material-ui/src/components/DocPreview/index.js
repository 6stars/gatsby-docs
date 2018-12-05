import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Launch from '@material-ui/icons/Launch';
import { Link } from "gatsby";
import moment from "moment";
import DocTags from "../DocTags";
import config from "../../../data/SiteConfig";

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
});

class DocPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    if (window.innerWidth >= 640) {
      this.setState({ mobile: false });
    } else {
      this.setState({ mobile: true });
    }
  }
  
  render() {
    const { docInfo, classes } = this.props;
    // const { mobile } = this.state;
    // const expand = mobile;
    /* eslint no-undef: "off" */
    // const coverHeight = mobile ? 162 : 225;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {docInfo.title.substring(0,1)}
            </Avatar>
          }
          action={
            <Link style={{ textDecoration: "none" }} to={docInfo.path}>
              <IconButton>
                <Launch />
              </IconButton>
            </Link>
          }
          title={docInfo.title.toUpperCase()}
          subheader={`Published on ${moment(docInfo.date).format(
            config.dateFormat
          )}`}
        />
      <CardActionArea>
        <CardContent>
          <Typography component="p">
            {docInfo.excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
     
      <CardActions><DocTags tags={docInfo.tags} /></CardActions>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph variant="body2">
            Category: {docInfo.category}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    );
  }
}

export default withStyles(styles)(DocPreview);
