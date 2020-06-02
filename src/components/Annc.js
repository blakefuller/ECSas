import React, { Component } from "react";
// material UI
import { withStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography, IconButton, Divider } from "@material-ui/core";
import createSpacing from "@material-ui/core/styles/createSpacing";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = (theme) => ({
  palette: {
    primary: {
      light: "#72f3ad",
      main: "#4ff199",
      dark: "#37a86b",
    },
    secondary: {
      light: "#caded2",
      main: "#4ff199",
      dark: "#84958b",
    },
  },
  card: {
    marginBottom: "20px",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  description: {
    // padding: spacing
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  url: {
    color: `${theme.palette.primary.dark}`,
    display: "block"
  }
});

class Annc extends Component {
  render() {
    dayjs.extend(relativeTime)
    const {
      classes,
      annc: {
        category,
        evnt_title,
        evnt_date,
        evnt_loc,
        description,
        url,
        cont_name,
        cont_email,
        timestamp
      },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton aria-label="options">
              <MoreVertIcon />
            </IconButton>
          }
          title={evnt_title}
          subheader={evnt_date + " - " + evnt_loc}
        />
        <CardContent>
          <Typography
            className={classes.description}
            variant="body2"
            gutterBottom
          >
            {description}
          </Typography>
          <Divider className={classes.divider} light />
          <Typography
            className={classes.url}
            variant="caption"
            paragraph="true"
            component={Link}
            to={url}
          >
            {url}
          </Typography>
          <Typography className="contact" variant="caption">
            <p>submitted by {cont_name + " - " + cont_email}</p>
          </Typography>
          <Typography className="contact" variant="caption">
            <p>submitted {dayjs(timestamp).fromNow()}</p>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Annc);
