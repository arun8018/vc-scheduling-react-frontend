import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backGroundColor: {
    backgroundColor: theme.palette.common.white,
  },
  title: {
    flexGrow: 1,
    padding: "1rem 0rem",
    color: theme.palette.primary.dark,
  },
  imgStyle: {
    width: "167px",
    height: "28px",
  },
}));
export default function Header({title,logo}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        position="sticky"
        className={classes.backGroundColor}
        elevation={1}
      >
        <Toolbar>
          <IconButton edge="start">
            <img src={logo} alt="Tatcha-Logo" className={classes.imgStyle} />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
