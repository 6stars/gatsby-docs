import React from 'react'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import withWidth from '@material-ui/core/withWidth'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Popper from '@material-ui/core/Popper'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import SearchIcon from '@material-ui/icons/Search'
import { Index } from 'elasticlunr'
import { Link } from 'gatsby'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

// Graphql query used to retrieve the serialized search index.
export const query = graphql`
  query SearchIndexExampleQuery {
    siteSearchIndex {
      index
    }
  }
`

const styles = theme => ({
  root: {
    flex: 'grow',
    fontFamily: theme.typography.fontFamily,
    fontSize: '10px',
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
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${
      theme.spacing.unit
    }px ${theme.spacing.unit * 9}px`,
  },
  searchContainer: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '10px',
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
      width: 240,
      '&:focus': {
        width: 300,
      },
      [theme.breakpoints.down('sm')]: {
        width: 155,
        '&:focus': {
          width: 155,
        },
      },
    },
  },
  suggestion: {
    display: 'block',
    fontSize: '10px',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    top: 20,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  chip: {
    margin: theme.spacing.unit,
    fontSize: 10,
  },
  popper: {
    zIndex: '1000 !important',
    top: '15px !important',
    backgroundColor: '#fff',
  },
})

function renderInputComponent(inputProps) {
  const { classes, inputref = () => {}, ref, ...other } = inputProps

  return (
    <div className={classes.searchContainer}>
      <div className={classes.search}>
        <SearchIcon />
      </div>
      <Input
        disableUnderline
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        {...other}
      />
    </div>
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matchesTitle = match(suggestion.title, query)
  const partsTitle = parse(suggestion.title, matchesTitle)
  const matchesDesc = match(suggestion.description, query)
  const partsDesc = parse(suggestion.description, matchesDesc)
  const matchesCategory = match(suggestion.category, query)
  const partsCategory = parse(suggestion.category, matchesCategory)

  const tags = suggestion.tags
  return (
    <List
      style={{
        padding: 0,
      }}
    >
      <ListItem
        alignItems="flex-start"
        style={{
          fontSize: '12px',
          boxShadow:
            '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
        }}
        selected={isHighlighted}
        component="div"
      >
        <Link
          style={{
            textDecoration: 'none',
            color: '#000',
            width: '100%',
            height: '100%',
          }}
          to={suggestion.route}
        >
          <ListItemText
            primary={
              <React.Fragment>
                {' '}
                {partsTitle.map(
                  (part, index) =>
                    part.highlight ? (
                      <span
                        key={String(index)}
                        style={{ fontWeight: 500, height: '50px' }}
                      >
                        {part.text}
                      </span>
                    ) : (
                      <strong
                        key={String(index)}
                        style={{ fontWeight: 300, height: '50px' }}
                      >
                        {part.text}
                      </strong>
                    )
                )}
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                {partsCategory.map(
                  (part, index) =>
                    part.highlight ? (
                      <span
                        key={String(index)}
                        style={{ fontWeight: 500, height: '50px' }}
                      >
                        {part.text}
                      </span>
                    ) : (
                      <strong
                        key={String(index)}
                        style={{ fontWeight: 300, height: '50px' }}
                      >
                        {part.text}
                      </strong>
                    )
                )}
                {suggestion.description.length > 0 ? (
                  <span>{' - '}</span>
                ) : (
                  <span>{''}</span>
                )}

                {partsDesc.map(
                  (part, index) =>
                    part.highlight ? (
                      <span
                        key={String(index)}
                        style={{ fontWeight: 500, height: '50px' }}
                      >
                        {part.text}
                      </span>
                    ) : (
                      <strong
                        key={String(index)}
                        style={{ fontWeight: 300, height: '50px' }}
                      >
                        {part.text}
                      </strong>
                    )
                )}
              </React.Fragment>
            }
          />
          <Divider style={{ margin: '5px -16px 0 -16px' }} />
          {tags &&
            tags.map(tag => (
              <Chip
                color="primary"
                variant="outlined"
                label={tag}
                style={{
                  'font-size': '10px',
                  margin: '6px 6px 0 6px',
                  height: '22px',
                }}
              />
            ))}
        </Link>
      </ListItem>
    </List>
  )
}

function getSuggestionValue(suggestion) {
  return suggestion.title
}

class DocSearch extends React.Component {
  inputref = null

  constructor(props) {
    super(props)
    this.state = {
      popper: '',
      hits: [],
    }
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    let searchResults = this.search(value)
    this.setState({
      hits: searchResults,
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      hits: [],
    })
  }

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    })
  }

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = query => {
    query = deburr(query.trim()).toLowerCase()
    this.index = this.getOrCreateIndex()
    let results = this.index
      .search(query, {})
      // Map over each ID and return the full document
      .map(({ ref }) => this.index.documentStore.getDoc(ref))
    return results
  }

  render() {
    const { classes } = this.props

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.hits,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    }

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search Docs...',
            value: this.state.popper,
            onChange: this.handleChange('popper'),
            inputRef: node => {
              this.popperNode = node
            },
            inputlabelprops: {
              shrink: true,
            },
          }}
          theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => {
            return (
              <Popper
                anchorEl={this.popperNode}
                open={Boolean(options.children != null && options.children)}
                placement={'bottom-start'}
                disablePortal={false}
                className={classes.popper}
                modifiers={{
                  flip: {
                    enabled: false,
                  },
                }}
              >
                <Paper
                  square
                  {...options.containerProps}
                  style={{
                    width: this.popperNode ? this.popperNode.clientWidth : null,
                  }}
                >
                  {options.children}
                </Paper>
              </Popper>
            )
          }}
        />
      </div>
    )
  }
}

DocSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
}

export default compose(
  withWidth(),
  withStyles(styles)
)(DocSearch)
