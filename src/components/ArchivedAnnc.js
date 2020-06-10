import React, { Component } from "react";
// material UI
import { withStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {
  Typography,
  IconButton,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";

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
    textDecoration: "none",
  },
});

// styled menu component
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

// styled menu item component
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class ArchivedAnnc extends Component {
  state = {
    anchorEl: null,
  };

  // function for handling edit button
  handleEditClick = () => {
    // TODO
  };

  // function for handling delete button
  handleDeleteClick = () => {
    const anncId = this.props.annc.id;
    axios
      .delete(`/archive/${anncId}`, null, {
        headers: { Authorization: `${localStorage.FBIdToken}` },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  // function for handling menu button
  handleMenuClick = (event) => {
    this.setState({
      anchorEl: event.target,
    });
  };

  // function for handling close menu button
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

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
            <IconButton
              aria-controls="customized-menu"
              aria-haspopup="true"
              aria-label="options"
              onClick={this.handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={evnt_title}
          subheader={evnt_date + " - " + evnt_loc}
        />

        {/* Popup menu */}
        <StyledMenu
          id="customized-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {/* Edit button */}
          <StyledMenuItem name="editButton" onClick={this.handleEditClick} disabled>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </StyledMenuItem>
          {/* Delete button */}
          <StyledMenuItem name="deleteButton" onClick={this.handleDeleteClick}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </StyledMenuItem>
        </StyledMenu>

        {/* Card body */}
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

export default withStyles(styles)(ArchivedAnnc);
