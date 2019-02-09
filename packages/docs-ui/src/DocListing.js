import React from 'react';
import DocSummary from './DocSummary';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import format from "date-fns/format";

const styles = theme => ({
  root: {
    flexGrow: 1,
    fontWeight: 500,
  },
  paper: {
    height: 140,
    width: 400,
  },
   '& h1': {
      ...theme.typography.h4,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
      margin: '8px 0 4px',
    },
    '& .description': {
      ...theme.typography.headline,
      margin: '0 0 20px',
    },
    '& h2': {
      ...theme.typography.h6,
      color: theme.palette.text.secondary,
      margin: '16px 0 12px',
    },
    '& h3': {
      ...theme.typography.headline,
      color: theme.palette.text.secondary,
      margin: '16px 0 12px',
    },
    '& h4': {
      ...theme.typography.h5,
      color: theme.palette.text.secondary,
      margin: '12px 0 8px',
    },
  control: {
    padding: 16,
  },
});
class DocListing extends React.Component {

  state = {
    spacing: '16',
  };

  getDocList() {
    const docList = [];
    this.props.docEdges.forEach(docEdge => {
      
      docList.push({
        path: docEdge.node.fields.route,
        slug: docEdge.node.fields.slug,
        tags: docEdge.node.frontmatter.tags,
        category: docEdge.node.frontmatter.category,
        description: docEdge.node.frontmatter.description,
        title: docEdge.node.frontmatter.title,
        cover: docEdge.node.frontmatter.cover,
        formattedDate: format(docEdge.node.frontmatter.rawDate, "MMMM Do YYYY"),
        excerpt: docEdge.node.excerpt,
        timeToRead: docEdge.node.timeToRead,
      });
    });
    return docList;
  }
  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    const docList = this.getDocList();

    return (
      
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
        <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
          {docList.map(doc => (
            <Grid key={doc.title} item>
              <DocSummary key={doc.title} docInfo={doc} />
            </Grid>
          ))}
        </Grid> 
       </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DocListing);
