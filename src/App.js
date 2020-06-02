import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import anncForm from "./pages/anncForm";
import admin from "./pages/admin";
import adminLogin from "./pages/adminLogin";
import Navbar from "./components/Navbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#72f3ad",
      main: "#4ff199",
      dark: "#37a86b",
    },
    secondary: {
      light: "#caded2",
      main: "#4ff199",
      dark: "#84958b",
    },
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/form" component={anncForm} />
              <Route path="/admin" component={admin} />
              <Route path="/admin-login" component={adminLogin} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
