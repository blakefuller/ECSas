import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Annc from "../components/Annc";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  button: {
    margin: "none"
  }
}

export class admin extends Component {
  state = {
    anncs: null,
    loading: true,
    authError: false,
    openBar: false
  };

  // function for closing error message
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      openBar: false,
    });
  };

  componentDidMount() {
    axios
      .get("/anncs", {
        headers: { Authorization: `${localStorage.FBIdToken}` },
      })
      .then((res) => {
        this.setState({
          anncs: res.data,
        });
      })
      .catch(() => {
        this.setState({
          authError: true,
          openBar: true
        })
      });
  }
  render() {
    const { classes } = this.props;
    let currentAnncs = this.state.anncs ? (
      this.state.anncs.map((annc) => (
        <Grid item key={annc.id}>
          <Annc annc={annc} />
        </Grid>
      ))
    ) : (
      <p>Loading Announcements...</p>
    );
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item sm={8} xs={12}>
            {currentAnncs}
          </Grid>
        </Grid>

        {/* error message */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.authError}
          autoHideDuration={6000}
          onClose={this.handleClose}
          // color={theme.palette.primary}
          message={"Unauthorized"}
          action={
            <React.Fragment>
              <Button color="secondary" component={Link} to="/admin-login">
                login here
              </Button>
            </React.Fragment>
          }
        >
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(admin);
