import React from "react";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    margin: ".2rem",
    boxShadow:"none"
  }
}));
export default function ImageButton({onButtonClick,children}) {
    const classes = useStyles();
    // const onButtonClick = () => {
    //     console.log("hello")
    // }
  return (
    <Fab className={classes.buttonWrapper} color="primary" onClick={onButtonClick}>
      {children}
    </Fab>
  );
}
