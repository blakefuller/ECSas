import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Annc from "../components/Annc";
import ArchivedAnnc from "../components/ArchivedAnnc";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { IconButton } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const styles = {
  button: {
    margin: "none",
  },
  category: {
    marginLeft: "20%",
  },
};

export class admin extends Component {
  // set state
  state = {
    anncs: null,
    ecsAnncs: [],
    ecsEvents: [],
    regAdv: [],
    ccc: [],
    offCampus: [],
    archAnncs: [],
    loading: true,
    authError: false,
    openBar: false,
    expandArch: false,
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

  // function to render each announcement category
  renderCategory = (category) => {
    let rendered = this.state[category] ? (
      this.state[category].map((annc) => (
        <Grid item key={annc.id}>
          <Annc annc={annc} />
        </Grid>
      ))
    ) : (
      <p>Loading...</p>
    );
    return rendered;
  };

  // function to render each archived announcement category
  renderArchivedCategory = (category) => {
    let rendered = this.state[category] ? (
      this.state[category].map((annc) => (
        <Grid item key={annc.id}>
          <ArchivedAnnc annc={annc} />
        </Grid>
      ))
    ) : (
      <p>Loading...</p>
    );
    return rendered;
  };

  // GET all anncs after mounting admin component
  componentDidMount() {
    axios
      .get("/anncs", {
        headers: { Authorization: `${localStorage.FBIdToken}` },
      })
      .then((res) => {
        // map announcement to correct category
        res.data.forEach((annc) => {
          switch (annc.category) {
            case "SPU ECS announcements":
              this.state.ecsAnncs.push(annc);
              break;
            case "SPU ECS events":
              this.state.ecsEvents.push(annc);
              break;
            case "SPU ECS events":
              this.state.ecsEvents.push(annc);
              break;
            case "Registration/Advising":
              this.state.regAdv.push(annc);
              break;
            case "SPU Center for Career and Calling":
              this.state.ccc.push(annc);
              break;
            case "Off campus non-SPU events":
              this.state.offCampus.push(annc);
              break;
          }
        });
        this.setState({
          anncs: res.data,
        });
      })
      .catch(() => {
        this.setState({
          authError: true,
          openBar: true,
        });
      });
  }

  // function for loading archived anncs after panel is expanded
  handleExpand = () => {
    axios
      .get("/archive", {
        headers: { Authorization: `${localStorage.FBIdToken}` },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          archAnncs: res.data,
        });
      })
      .catch(() => {
        this.setState({
          authError: true,
          openBar: true,
        });
      });
    this.setState({
      expandArch: !this.state.expandArch,
    });
  };

  render() {
    const { classes } = this.props;

    let ecsAnncs = this.renderCategory("ecsAnncs");
    let ecsEvents = this.renderCategory("ecsEvents");
    let regAdv = this.renderCategory("regAdv");
    let ccc = this.renderCategory("ccc");
    let offCampus = this.renderCategory("offCampus");
    let archAnncs = this.renderArchivedCategory("archAnncs");

    return (
      <Grid container spacing={0}>
        <h1 className={classes.category}>ECS announcements</h1>
        <Grid container justify="center" spacing={8}>
          <Grid item sm={8} xs={12}>
            {ecsAnncs}
          </Grid>
        </Grid>

        <Divider orientation="horizontal" />
        <h1 className={classes.category}>ECS events</h1>
        <Grid container justify="center" spacing={8}>
          <Grid item sm={8} xs={12}>
            {ecsEvents}
          </Grid>
        </Grid>

        <h1 className={classes.category}>Registration/Advising</h1>
        <Grid container justify="center" spacing={8}>
          <Grid item sm={8} xs={12}>
            {regAdv}
          </Grid>
        </Grid>

        <h1 className={classes.category}>Center for Career and Calling</h1>
        <Grid container justify="center" spacing={8}>
          <Grid item sm={8} xs={12}>
            {ccc}
          </Grid>
        </Grid>

        <h1 className={classes.category}>Off-campus events</h1>
        <Grid container justify="center" spacing={8}>
          <Grid item sm={8} xs={12}>
            {offCampus}
          </Grid>
        </Grid>

        {/* Archived Announcements */}
        <Grid container>
          <h1 className={classes.category}>Archived Announcements</h1>
          <IconButton onClick={this.handleExpand}>
            {!this.state.expandArch && <ExpandMoreIcon />}
            {this.state.expandArch && <ExpandLessIcon />}
          </IconButton>
        </Grid>
        {this.state.expandArch && (
          <Grid container justify="center" spacing={8}>
            <Grid item sm={8} xs={12}>
              {archAnncs}
            </Grid>
          </Grid>
        )}

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
        ></Snackbar>
      </Grid>
    );
  }
}

export default withStyles(styles)(admin);
