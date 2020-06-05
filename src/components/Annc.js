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
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import createSpacing from "@material-ui/core/styles/createSpacing";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const styles = (theme) => ({
  palette: {
    primary: {
      light: "#81A1C1",
      main: "#5E81AC",
      dark: "#4C566A",
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
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  url: {
    color: `${theme.palette.primary.dark}`,
    display: "block",
  },
  link: {
    color: theme.palette.primary.light,
    textDecoration: "none"
  }
});

class Annc extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      annc: {
        id,
        category,
        evnt_title,
        evnt_date,
        evnt_loc,
        description,
        url,
        cont_name,
        cont_email,
        timestamp,
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
            paragraph={true}
          >
            <a className={classes.link} href={url} target="blank">
              {url}
            </a>
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
