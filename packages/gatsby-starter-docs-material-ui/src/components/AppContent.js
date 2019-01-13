import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    paddingTop: 75,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      maxWidth: 'calc(100% - 52px)',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit * 7,
      maxWidth: 'calc(100% - 240px - 52px)',
    },
  },
});

function AppContent(props) {
  const { className, classes, children } = props;
  
  return <main className={classNames(classes.root, className)}>{children}</main>;
}

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(AppContent);
