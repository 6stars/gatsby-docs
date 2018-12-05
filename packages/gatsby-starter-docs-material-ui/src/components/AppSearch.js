import React from 'react';
import keycode from 'keycode';
import compose from 'recompose/compose';
import EventListener from 'react-event-listener';
import PropTypes from 'prop-types';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';


let searchTimer;
let initialized = false;

function initDocsearch() {
  if (!process.browser) {
    return;
  }

  clearInterval(searchTimer);
  searchTimer = setInterval(() => {
    const docsearchInput = document.querySelector('#docsearch-input');

    if (!window || !window.docsearch || !docsearchInput) {
      return;
    }

    if (initialized === docsearchInput) {
      clearInterval(searchTimer);
      return;
    }

    initialized = docsearchInput;
    clearInterval(searchTimer);

    var client = algoliasearch('YJ8DQBD87H', '6ce03b6d7b23403fbb92d35c902073c5');
    var index = client.initIndex('defi-docs');
    window.docsearch({
      appId: 'YJ8DQBD87H',
      apiKey: '6ce03b6d7b23403fbb92d35c902073c5',
      indexName: 'defi-docs',
      inputSelector: '#docsearch-input',
      handleSelected: (input, event, suggestion) => { 
        const url = suggestion.url
          .replace(/^https:\/\/nifty-jepsen-a1a20b\.netlify\.com/, '')
          .replace(/\/#/, '#')
          .replace(/\/$/, '');
      },
      // Set debug to true if you want to inspect the dropdown.
      debug: false,
    });
  
 }, 100);
 
}

const styles = theme => ({
  '@global': {
    '.algolia-autocomplete': {
      fontFamily: theme.typography.fontFamily,
      '& .algolia-docsearch-suggestion--category-header-lvl0': {
        color: theme.palette.text.primary,
      },
      '& .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column': {
        opacity: 1,
        padding: '5.33px 10.66px',
        textAlign: 'right',
        width: '30%',
        '&:before': {
          display: 'block',
        },
        '&:after': {
          display: 'none',
        },
      },
      '& .algolia-docsearch-suggestion .algolia-docsearch-suggestion--content': {
        float: 'right',
        padding: '5.33px 0 5.33px 10.66px',
        width: '70%',
        '&:before': {
          display: 'block',
        },
      },
      '& .algolia-docsearch-suggestion--subcategory-column-text': {
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightRegular,
      },
      '& .algolia-docsearch-suggestion--highlight': {
        color: theme.palette.type === 'light' ? '#174d8c' : '#acccf1',
      },
      '& .algolia-docsearch-suggestion': {
        background: 'transparent',
      },
      '& .algolia-docsearch-suggestion--title': {
        ...theme.typography.title,
      },
      '& .algolia-docsearch-suggestion--text': {
        ...theme.typography.body1,
      },
      '& .ds-dropdown-menu': {
        boxShadow: theme.shadows[1],
        borderRadius: 2,
        '&::before': {
          display: 'none',
        },
        '& [class^=ds-dataset-]': {
          border: 0,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        },
      },
    },
  },   
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    '& $inputInput': {
      transition: theme.transitions.create('width'),
      width: 120,
      '&:focus': {
        width: 170,
      },
    },
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 9}px`,
  },
    aa_input_container: {
      display: "inline-block",
      position: "relative"
    },
    aa_input_search: {
      "width": "300px",
      "padding": "12px 28px 12px 12px",
      "border": "2px solid #e4e4e4",
      "borderRadius": "4px",
      "WebkitTransition": ".2s",
      "transition": ".2s",      
      "boxShadow": "4px 4px 0 rgba(241, 241, 241, 0.35)",
      "fontSize": "11px",
      "boxSizing": "border-box",
      "color": "#333",
      "WebkitAppearance": "none",
      "MozAppearance": "none",
      "appearance": "none"
    },
    "aa_input_search___webkit_search_decoration": {
      "display": "none"
    },
    "aa_input_search___webkit_search_cancel_button": {
      "display": "none"
    },
    "aa_input_search___webkit_search_results_button": {
      "display": "none"
    },
    "aa_input_search___webkit_search_results_decoration": {
      "display": "none"
    },
    "aa_input_search_focus": {
      "outline": "0",
      "borderColor": "#3a96cf",
      "boxShadow": "4px 4px 0 rgba(58, 150, 207, 0.1)"
    },
    "aa_input_icon": {
      "height": "16px",
      "width": "16px",
      "position": "absolute",
      "top": "50%",
      "right": "16px",
      "WebkitTransform": "translateY(-50%)",
      "transform": "translateY(-50%)",
      "fill": "#e4e4e4"
    },
    "aa_hint": {
      "color": "#e4e4e4"
    },
    "aa_dropdown_menu": {
      "backgroundColor": "#fff",
      "border": "2px solid rgba(228, 228, 228, 0.6)",
      "borderTopWidth": "1px",
      "fontFamily": "\"Montserrat\", sans-serif",
      "width": "300px",
      "marginTop": "10px",
      "boxShadow": "4px 4px 0 rgba(241, 241, 241, 0.35)",
      "fontSize": "11px",
      "borderRadius": "4px",
      "boxSizing": "border-box"
    },
    "aa_suggestion": {
      "padding": "12px",
      "borderTop": "1px solid rgba(228, 228, 228, 0.6)",
      "cursor": "pointer",
      "WebkitTransition": ".2s",
      "transition": ".2s",
      "display": "flex",
      "WebkitBoxPack": "justify",
      "MsFlexPack": "justify",
      "justifyContent": "space-between",
      "WebkitBoxAlign": "center",
      "MsFlexAlign": "center",
      "alignItems": "center"
    },
    "aa_suggestion_hover": {
      "backgroundColor": "rgba(241, 241, 241, 0.35)"
    },
    "aa_suggestion_aa_cursor": {
      "backgroundColor": "rgba(241, 241, 241, 0.35)"
    },
    "aa_suggestion___span_first_child": {
      "color": "#333"
    },
    "aa_suggestion___span_last_child": {
      "textTransform": "uppercase",
      "color": "#a9a9a9"
    },
    "aa_suggestion___span_first_child_em": {
      "fontWeight": "700",
      "fontStyle": "normal",
      "backgroundColor": "rgba(58, 150, 207, 0.1)",
      "padding": "2px 0 2px 2px"
    },
    "aa_suggestion___span_last_child_em": {
      "fontWeight": "700",
      "fontStyle": "normal",
      "backgroundColor": "rgba(58, 150, 207, 0.1)",
      "padding": "2px 0 2px 2px"
    }
    
});

class AppSearch extends React.Component {
  inputRef = null;

  handleKeyDown = event => {
    if (
      ['/', 's'].indexOf(keycode(event)) !== -1 &&
      document.activeElement.nodeName.toLowerCase() === 'body' &&
      document.activeElement !== this.inputRef
    ) {
      event.preventDefault();
      this.inputRef.focus();
    }
  };

  render() {
    const { classes, width } = this.props;

    if (isWidthUp('sm', width)) {
      initDocsearch();
    }

    return (
      <div className={classes.root} style={{ display: isWidthUp('sm', width) ? 'block' : 'none' }}>
        <EventListener target="window" onKeyDown={this.handleKeyDown} />
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <Input
          disableUnderline
          placeholder="Search Docs…"
          id="docsearch-input"
          inputRef={ref => {
            this.inputRef = ref;
          }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
            aa_input_search: classes.aa_input_search
          }}
        />
      </div>
    );
  }
}

AppSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(AppSearch);
