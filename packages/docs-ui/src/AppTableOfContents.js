/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import throttle from 'lodash/throttle';
import EventListener from 'react-event-listener';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
// import { textToHash } from '@material-ui/docs/MarkdownElement/MarkdownElement';

let itemsServer = null;
// renderer.heading = (text, level) => {
//   if (level === 1 || level > 3) {
//     return;
//   }

//   if (level === 2) {
//     itemsServer.push({
//       text,
//       level,
//       hash: textToHash(text),
//       children: [],
//     });
//   }

//   if (level === 3) {
//     itemsServer[itemsServer.length - 1].children.push({
//       text,
//       level,
//       hash: textToHash(text),
//     });
//   }
// };

const drawerWidth = 200;

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: '.7rem',
    top: 40,
    width: 200,
    flexShrink: 0,
    order: 2,
    position: 'sticky',
    wordBreak: 'break-word',
    height: 'calc(100vh)',
    overflowY: 'auto',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px`,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '& a': {
      // Style taken from the Link component
      color: theme.palette.text.secondary,
      padding: `${theme.spacing.unit / 2}px 0`,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& ul': {
      padding: 0,
      margin: 0,
      listStyleType: 'none',
    }
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: '.8rem', 
    marginTop: theme.spacing.unit * 7,
    borderBottom: '1px solid #eee',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
});

class AppTableOfContents extends React.Component {
  handleScroll = throttle(() => {
    this.findActiveIndex();
  }, 166); // Corresponds to 10 frames at 60 Hz.

  constructor(props) {
    super(props);
    itemsServer = [];    
  }

  state = {
    active: null,
  };

  componentDidMount() {
    this.itemsClient = [];

    itemsServer.forEach(item2 => {
      this.itemsClient.push({
        ...item2,
        node: document.getElementById(item2.hash),
      });

      if (item2.children.length > 0) {
        item2.children.forEach(item3 => {
          this.itemsClient.push({
            ...item3,
            node: document.getElementById(item3.hash),
          });
        });
      }
    });

    this.findActiveIndex();
  }

  componentWillUnmount() {
    this.handleScroll.cancel();
  }

  findActiveIndex = () => {
    let active;

    for (let i = 0; i < this.itemsClient.length; i += 1) {
      const item = this.itemsClient[i];
      if (
        document.documentElement.scrollTop < item.node.offsetTop + 100 ||
        i === this.itemsClient.length - 1
      ) {
        active = item;
        break;
      }
    }

    if (active && this.state.active !== active.hash) {
      this.setState({
        active: active.hash,
      });
    }
  };

  render() {
  
    const { classes , title, toc, className, disablePermanent } = this.props;
    
    const { active } = this.state;
    return (
      <nav className={classes.root}>
      <Hidden lgUp={!disablePermanent} implementation="js">
        <Drawer
          classes={{
            paper: classNames(classes.paper, 'algolia-drawer'),
          }}
          variant="permanent"
          open={true}
          anchor="right"
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.root}>
            <Typography variant="body2" gutterBottom className={classes.title}>
              {title}
            </Typography>
            <EventListener target="window" onScroll={this.handleScroll} />
            <div className={classes.content} dangerouslySetInnerHTML={{ __html: toc ? toc : '' }} />
            <p className="toc-menu">
              <a className="expand-toggle" href="#">Collapse all</a>
              <a className="back-to-top" href="#">Back to top</a>
              <a className="go-to-bottom" href="#">Go to bottom</a>
            </p>
        </div>
        </Drawer>
      </Hidden>
      {disablePermanent ? null : (
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.paper,
            }}
            variant="permanent"
            open
            anchor="right"
          >
             <div className={classes.root}>
            <Typography variant="body2" gutterBottom className={classes.title}>
              {title}
            </Typography>
            <EventListener target="window" onScroll={this.handleScroll} />
            <div className={classes.content} dangerouslySetInnerHTML={{ __html: toc ? toc : '' }} />
            {/* <p className="toc-menu">
              <a className="expand-toggle" href="#">Collapse all</a>
              <a className="back-to-top" href="#">Back to top</a>
              <a className="go-to-bottom" href="#">Go to bottom</a>
            </p> */}
          </div>
          </Drawer>
        </Hidden>
        )}
        
      </nav>
    );
  }
}

AppTableOfContents.propTypes = {
  classes: PropTypes.object.isRequired,
  toc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(AppTableOfContents);
