import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme/index";
// import LandingPage from "./Pages/LandingPage";
import MeetingPage from "./Pages/MeetingLive";
// import ChatWindow from "./Pages/ChatWindow";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MeetingPage />
    </ThemeProvider>
  );
}

export default App;
