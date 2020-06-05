import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Annc from "../components/Annc";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { IconButton } from "@material-ui/core";

const styles = {
  button: {
    margin: "none",
  },
  category: {
    marginLeft: "35px",
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

    let currentAnncs = this.renderCategory("anncs");
    let ecsAnncs = this.renderCategory("ecsAnncs");
    let ecsEvents = this.renderCategory("ecsEvents");
    let regAdv = this.renderCategory("regAdv");
    let ccc = this.renderCategory("ccc");
    let offCampus = this.renderCategory("offCampus");
    let archAnncs = this.renderCategory("archAnncs");

    return (
      <Grid container spacing={0}>
        <h1>ECS announcements</h1>
        <Grid container spacing={8}>
          <Grid item sm={8} xs={12}>
            {ecsAnncs}
          </Grid>
        </Grid>

        <h1>ECS events</h1>
        <Grid container spacing={8}>
          <Grid item sm={8} xs={12}>
            {ecsEvents}
          </Grid>
        </Grid>

        <h1>Registration/Advising</h1>
        <Grid container spacing={8}>
          <Grid item sm={8} xs={12}>
            {regAdv}
          </Grid>
        </Grid>

        <h1>Center for Career and Calling</h1>
        <Grid container spacing={8}>
          <Grid item sm={8} xs={12}>
            {ccc}
          </Grid>
        </Grid>

        <h1 className={classes.category}>Off-campus events</h1>
        <Grid container spacing={8}>
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
          <Grid container spacing={8}>
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
