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
  // set state
  state = {
    anncs: null,
    ecsAnncs: [],
    ecsEvents: [],
    regAdv: [],
    ccc: [],
    offCampus: [],
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
  }

  componentDidMount() {
    axios
      .get("/anncs", {
        headers: { Authorization: `${localStorage.FBIdToken}` },
      })
      .then((res) => {
        // map announcement to correct category
        res.data.forEach(annc => {
          switch(annc.category) {
            case 'SPU ECS announcements':
              this.state.ecsAnncs.push(annc);
              break
            case 'SPU ECS events':
              this.state.ecsEvents.push(annc)
              break
            case 'SPU ECS events':
              this.state.ecsEvents.push(annc)
              break
            case 'Registration/Advising':
              this.state.regAdv.push(annc)
              break
            case 'SPU Center for Career and Calling':
              this.state.ccc.push(annc)
              break
            case 'Off campus non-SPU events':
              this.state.offCampus.push(annc)
              break
          }
        });
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

    let currentAnncs = this.renderCategory('anncs')
    let ecsAnncs = this.renderCategory('ecsAnncs')
    let ecsEvents = this.renderCategory('ecsEvents')
    let regAdv = this.renderCategory('regAdv')
    let ccc = this.renderCategory('ccc')
    let offCampus = this.renderCategory('offCampus')

    return (
      <div>
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

        <h1>Off-campus events</h1>
        <Grid container spacing={8}>
          <Grid item sm={8} xs={12}>
            {offCampus}
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
