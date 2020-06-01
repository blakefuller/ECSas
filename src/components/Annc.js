import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// material UI
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography, IconButton } from "@material-ui/core";

const styles = {
  card: {
    display: "flex",
  },
};

class Annc extends Component {
  render() {
    const {
      classes,
      annc: {
        category,
        evnt_title,
        evnt_date,
        evnt_loc,
        description,
        url,
        cont_name,
        cont_email,
      },
    } = this.props;
    return (
      <Card>
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
          <Typography variant="body2" gutterBottom="true">{description}</Typography>
          <Typography variant="subtitle2" ></Typography>
          <Typography variant="caption"></Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Annc);
