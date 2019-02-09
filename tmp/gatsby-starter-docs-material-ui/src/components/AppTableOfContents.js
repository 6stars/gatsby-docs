/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import EventListener from 'react-event-listener';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: '.75rem',
    color: theme.palette.text.primary,
    top: 40,
    width: 200,
    flexShrink: 0,
    order: 2,
    position: 'sticky',
    wordBreak: 'break-word',
    height: 'calc(100vh)',
    overflowY: 'auto',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0`,
    paddingLeft: '15px',
    display: 'none',
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
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
    fontSize: '.85rem', 
    marginTop: theme.spacing.unit * 2,
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
    const { classes , title, contents } = this.props;
    const { active } = this.state;

    return (
      <nav className={classes.root}>
        <React.Fragment>
            <Typography variant="body2" gutterBottom className={classes.title}>
              {title}
            </Typography>
            <EventListener target="window" onScroll={this.handleScroll} />
            <div className={classes.content} dangerouslySetInnerHTML={{ __html: contents ? contents : '' }} />
            <p className="toc-menu">
              <a className="expand-toggle" href="#">Collapse all</a>
              <a className="back-to-top" href="#">Back to top</a>
              <a className="go-to-bottom" href="#">Go to bottom</a>
            </p>
        </React.Fragment>
        {/* {itemsServer.length > 0 ? (
          <React.Fragment>
            <Typography variant="body2" gutterBottom className={classes.contents}>
              Contents
            </Typography>
            <EventListener target="window" onScroll={this.handleScroll} />
            <ul className={classes.ul}>
              {itemsServer.map(item2 => (
                <li key={item2.text}>
                  <Typography
                    color={active === item2.hash ? 'textPrimary' : 'textSecondary'}
                    className={classes.item}
                    component={linkProps => (
                      <Link {...linkProps} variant="inherit" href={`#${item2.hash}`} />
                    )}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item2.text }} />
                  </Typography>
                  {item2.children.length > 0 ? (
                    <ul className={classes.ul}>
                      {item2.children.map(item3 => (
                        <li key={item3.text}>
                          <Typography
                            className={classes.item}
                            style={{
                              paddingLeft: 8 * 2,
                            }}
                            color={active === item3.hash ? 'textPrimary' : 'textSecondary'}
                            component={linkProps => (
                              <Link {...linkProps} variant="inherit" href={`#${item3.hash}`} />
                            )}
                          >
                            
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </React.Fragment>
        ) : null} */}
      </nav>
    );
  }
}

AppTableOfContents.propTypes = {
  classes: PropTypes.object.isRequired,
  contents: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(AppTableOfContents);
