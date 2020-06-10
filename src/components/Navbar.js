import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
// material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

export class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Grid container justify="space-between">
            <Button color="inherit" component={Link} to="/admin-login">
              Admin
            </Button>
            <Button color="inherit" component={Link} to="/form">
              New Announcement
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
