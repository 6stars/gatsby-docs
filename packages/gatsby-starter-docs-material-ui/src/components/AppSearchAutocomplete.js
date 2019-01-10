import React from 'react';
import { InstantSearch, Highlight } from "react-instantsearch/dom";
import { connectAutoComplete } from "react-instantsearch/connectors";
import Autocomplete from "downshift";
import keycode from 'keycode';
import compose from 'recompose/compose';
import EventListener from 'react-event-listener';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
  } 
});


function RawAutoComplete({ refine, hits }) {
  return (    
      <Autocomplete
        itemToString={i => (i ? i.name : i)}
        onChange={item =>
      >
        {({
          getInputProps,
          getItemProps,
          selectedItem,
          highlightedIndex,
          isOpen
        }) => (
          <div>
            <input
              {...getInputProps({
                onChange(e) {
                  refine(e.target.value);
                }
              })}
            />
            {isOpen && (
              <div>
                {hits.map((item, index) => (
                  <div
                    key={item.objectID}
                    {...getItemProps({
                      item,
                      index,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "gray" : "white",
                        fontWeight: selectedItem === item ? "bold" : "normal"
                      }
                    })}
                  >
                    <Highlight attributeName="frontmatter.title" hit={item} tagName="mark" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Autocomplete>    
  );
}

const AutoCompleteWithData = connectAutoComplete(RawAutoComplete);

class AppSearchAutocomplete extends React.Component {
  inputRef = null;

  render() {

    const { classes, width } = this.props;

    return (
      <InstantSearch
        appId="YJ8DQBD87H"
        apiKey="5536fe51d00e362827ec6e40fa6bda13"
        indexName="defi-docs"
      >      
        <AutoCompleteWithData classes={classes} width={width}/>
      </InstantSearch>
    );
  }
}

export default AppSearchAutocomplete;
//   withStyles(styles),
//   withWidth(),
// )(AppSearchAutocomplete);