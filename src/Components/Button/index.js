import React from 'react'
import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/styles";
// const useStyles = makeStyles((theme) => ({
//   btnColor: {
//     color: theme.palette.primary.main,
//   },
// }));
export default function MainButton({ label, variant, onButtonClick }) {
  // const classes = useStyles();
  return (
    <Button
      variant={variant}
      color="primary"
      style={{ width: "100%" }}
      onClick={onButtonClick}
    >
      {label}
    </Button>
  );
}
