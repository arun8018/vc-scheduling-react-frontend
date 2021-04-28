import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/tatcha-name-logo.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "../Components/Button";
import Header from "../Components/Header";
import Card from "../Components/Card";
import Container from "@material-ui/core/Container";
import UserCard from "../Components/UserCard";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  descriptionText: {
    lineHeight: 2,
  },
  btnWrapper: {
    paddingTop: "1rem",
  },
}));
export default function LandingPage() {
  const classes = useStyles();
  let history = useHistory();
  const handleButtonClick = () => {
    history.push("/meeting-page");
  }
    console.log("helloooooo", process.env.REACT_APP_CUSTOM);

  return (
    <>
      <Header title={""} logo={logo} />
      <Container component="main" maxWidth="sm">
        <Card>
          <UserCard />
          <Typography
            variant="body1"
            gutterBottom
            className={classes.descriptionText}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
          <Grid container spacing={2} className={classes.btnWrapper}>
            <Grid item xs={12} sm={6}>
              <Button label={"Notify Consultant"} variant={"outlined"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                label={"Join Consultantion"}
                variant={"contained"}
                onButtonClick={handleButtonClick }
              />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
