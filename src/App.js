import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme/index";
import LandingPage from "./Pages/LandingPage";
import {Route, Switch } from "react-router-dom";
// import MeetingPage from "./Pages/MeetingLive";
import MainPage from "./Pages/MainPage";
// import Meeting from "./Pages/Meeting";
import Controls from "./Pages/Controls";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/meeting-page" component={MainPage}></Route>
        <Route path="/controls-page" component={Controls}></Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
