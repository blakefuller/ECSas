import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";

const styles = {
  formContainer: {
    textAlign: "center",
  },
  formTitle: {
    margin: "30px",
  },
  button: {
    display: "block",
    alignContent: "center",
    marginTop: 30,
    position: "relative",
  },
  customError: {
    marginTop: 15,
    color: "red",
  },
  progress: {
    position: "absolute",
  },
  textField: {
    display: "block",
    padding: "5px"
  },
  description: {
    marginTop: "40px",
    marginBottom: "30px"
  }
};

// set the category choices
const categories = [
  {
    value: "SPU ECS announcements",
    label: "ECS announcements",
  },
  {
    value: "SPU ECS events",
    label: "ECS events",
  },
  {
    value: "Registration/Advising",
    label: "Registration/Advising",
  },
  {
    value: "SPU Center for Career and Calling",
    label: "Center for Career and Calling",
  },
  {
    value: "Off campus non-SPU events",
    label: "Off-campus events",
  },
];

// set the audience choices
const audiences = [
  {
    value: "All engineering and computer science students",
    label: "All ECS students",
  },
  {
    value: "All engineering students",
    label: "All engineering students",
  },
  {
    value: "Electrical and computer engineering students",
    label: "EE and CPE students",
  },
  {
    value: "Computer science students",
    label: "CSC students",
  },
  {
    value: "Computer science and computer engineering students",
    label: "CSC and CPE students",
  },
  {
    value: "Mechanical and general engineering students",
    label: "ME and EGR students",
  },
];

export class adminLogin extends Component {
  // initialize state
  constructor() {
    super();

    // get current date in mm/dd/yyyy
    let today = new Date();
    let mm = today.getMonth()+1;
    let dd = today.getDate();
    let yyyy = today.getFullYear();
    today = `${mm}/${dd}/${yyyy}`;

    this.state = {
      category: "",
      audience: "",
      evnt_title: "",
      evnt_date: today,
      evnt_loc: "",
      cont_name: "",
      cont_email: "",
      num_weeks: null,
      description: "",
      url: "",
      sub_name: "",
      sub_email: "",
      loading: false,
      errors: {},
    };
  }

  // function for handling the submitted form
  handleSubmit = (event) => {
    // disable showing email & password in url
    event.preventDefault();
    this.setState({
      loading: true,
      openBar: false,
    });
    // get form data from state
    const formData = {
      category: this.state.category,
      audience: this.state.audience,
      evnt_title: this.state.evnt_title,
      evnt_date: this.state.evnt_date,
      evnt_loc: this.state.evnt_loc,
      cont_name: this.state.cont_name,
      cont_email: this.state.cont_email,
      num_weeks: this.state.num_weeks,
      description: this.state.description,
      url: this.state.url,
      sub_name: this.state.sub_name,
      sub_email: this.state.sub_email,
    };

    // send POST request to API for login
    axios
      .post("/anncs", formData)
      // if login is successful
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
          openBar: true,
        });
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

  // function for handling date change
  handleDateChange = (date, value) => {
    this.setState({
      value: new Date(date).toISOString(),
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openBar: false });
  };

  render() {
    const { classes } = this.props;
    const {
      category,
      audience,
      evnt_title,
      evnt_date,
      evnt_loc,
      cont_name,
      cont_email,
      num_weeks,
      description,
      url,
      sub_name,
      sub_email,
      loading,
      errors,
    } = this.state;

    return (
      <Grid container className={classes.formContainer}>
        <Grid item sm />
        <Grid item>
          <Typography variant="h3" className={classes.formTitle}>
            New Announcement
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            {/* Category */}
            <TextField
              id="category"
              required
              name="category"
              type="category"
              label="Choose Category"
              select
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={category}
              onChange={this.handleChange}
              fullWidth
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Audience */}
            <TextField
              id="audience"
              required
              name="audience"
              type="audience"
              label="Choose Audience"
              select
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={audience}
              onChange={this.handleChange}
              fullWidth
            >
              {audiences.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Event Title */}
            <TextField
              id="evnt_title"
              required
              name="evnt_title"
              type="evnt_title"
              label="Event Title"
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={evnt_title}
              onChange={this.handleChange}
              fullWidth
            />

            {/* Event Date */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                format="MM/dd/yyy"
                id="evnt_date"
                name="evnt_date"
                type="evnt_date"
                label="Event Date"
                className={classes.textField}
                value={evnt_date}
                // TODO handler is broken
                onChange={this.handleDateChange}
                fullWidth
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>

            {/* Event Location */}
            <TextField
              id="evnt_loc"
              name="evnt_loc"
              type="evnt_loc"
              label="Event Location"
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={evnt_loc}
              onChange={this.handleChange}
              fullWidth
            />

            {/* Contact Name */}
            <TextField
              id="cont_name"
              name="cont_name"
              type="cont_name"
              label="Contact Name"
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={cont_name}
              onChange={this.handleChange}
              fullWidth
            />

            {/* Contact Email */}
            <TextField
              id="cont_email"
              name="cont_email"
              type="cont_email"
              label="Contact Email"
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={cont_email}
              onChange={this.handleChange}
              fullWidth
            />

            {/* Number of Weeks */}
            <TextField
              id="num_weeks"
              required
              name="num_weeks"
              type="number"
              label="Number of Weeks"
              number
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={num_weeks}
              onChange={this.handleChange}
            />

            {/* Description */}
            <TextField
              id="description"
              required
              name="description"
              type="description"
              label="Description"
              multiline
              rows={10}
              variant="outlined"
              className={classes.description}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={description}
              onChange={this.handleChange}
              fullWidth
            />

            {/* URL */}
            <TextField
              id="url"
              name="url"
              type="url"
              label="URL"
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={url}
              onChange={this.handleChange}
              fullWidth
            />

            {/* Submitter Name */}
            <TextField
              id="sub_name"
              name="sub_name"
              type="sub_name"
              label="Submitter Name"
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={sub_name}
              onChange={this.handleChange}
              required
            />

            {/* Submitter Email */}
            <TextField
              id="sub_email"
              name="sub_email"
              type="sub_email"
              label="Submitter Email"
              className={classes.textField}
              helperText={errors.message}
              error={errors.message ? true : false}
              value={sub_email}
              onChange={this.handleChange}
              required
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
              Submit Announcement
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>

            {/* success message */}
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={this.state.openBar}
              autoHideDuration={6000}
              onClose={this.handleClose}
              message={"Announcement Submitted"}
              // color={}
            />
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
