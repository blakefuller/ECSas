import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const styles = {
  formContainer: {
    textAlign: "center",
  },
  formTitle: {
    margin: "30px",
  },
  button: {
    marginTop: 30,
    position: "relative"
  },
  customError: {
    marginTop: 15,
    color: "red",
  },
  progress: {
    position: "absolute"
  }
};

export class adminLogin extends Component {
  // initialize state
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    };
  }

  // function for handling the submitted form
  handleSubmit = (event) => {
    // disable showing email & password in url
    event.preventDefault();
    this.setState({
      loading: true,
    });
    // get user data from state
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    // send POST request to API for login
    axios
      .post("/admin-login", userData)
      // if login is successful
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
        });
        this.props.history.push("/admin");
      })
      // catches any errors that occur during login
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  };

  // function for handling change in the form
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

    return (
      <Grid container className={classes.formContainer}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h3" className={classes.formTitle}>
            Admin Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {/* if any errors occur when logging in, display here */}
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && <CircularProgress size={30} className={classes.progress} />}
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

adminLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(adminLogin);
