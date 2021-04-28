import React from 'react'
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CallRoundedIcon from "@material-ui/icons/CallRounded";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttonStyle: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    margin:'.5rem'
  },
  iconStyle: {
    color: theme.palette.common.white,
  },
}));
export default function Controls() {
    const classes = useStyles();
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            justify="center"
            spacing={2}
            style={{ marginTop: "1rem" }}
          >
            <Grid item className={classes.buttonStyle}>
              <IconButton
                aria-label="add an alarm"
                size="medium"
                className={classes.iconStyle}
              >
                <VideocamRoundedIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item className={classes.buttonStyle}>
              <IconButton
                aria-label="add an alarm"
                size="medium"
                className={classes.iconStyle}
              >
                <CallRoundedIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item className={classes.buttonStyle}>
              <IconButton
                aria-label="add an alarm"
                size="medium"
                className={classes.iconStyle}
              >
                <MicRoundedIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
}
