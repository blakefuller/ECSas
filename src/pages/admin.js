import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Annc from "../components/Annc";

export class admin extends Component {
  state = {
    anncs: null,
  };
  componentDidMount() {
    axios
      .get("/anncs")
      .then((res) => {
        this.setState({
          anncs: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    let currentAnncs = this.state.anncs ? (
      this.state.anncs.map((annc) => (
        <Grid item>
          <Annc annc={annc} />
        </Grid>
      ))
    ) : (
      <p>Loading Announcements...</p>
    );
    return (
      <Grid container>
        <Grid item sm={8} xs={12}>
          {currentAnncs}
        </Grid>
      </Grid>
    );
  }
}

export default admin;
