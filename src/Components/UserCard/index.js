import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import logo from "../../assets/images/tatcha-logo.jpg";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  imgStyle: {
    width: "5rem",
    height: "auto",
  },
  userText: {
      marginTop: ".5rem",
    },
    userName: {
      fontWeight: "600",
  }
}));
export default function UserCard() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item>
        <img src={logo} alt="Tatcha-Logo" className={classes.imgStyle} />
      </Grid>
      <Grid item className={classes.userText}>
        <Typography className={classes.userName} gutterBottom>
          Rowena Garces
        </Typography>
        <Typography gutterBottom>Consultaion Date : 02/06/2021</Typography>
        <Typography gutterBottom>
          Consultaion Time : 11:00 AM - 11:30 AM(America...)
        </Typography>
      </Grid>
    </Grid>
  );
}
