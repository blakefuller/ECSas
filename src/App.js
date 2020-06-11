import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import anncForm from "./pages/anncForm";
import admin from "./pages/admin";
import adminLogin from "./pages/adminLogin";
import home from "./pages/home";
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
import themeFile from "./themes/theme";
import jwtDecode from "jwt-decode";

const theme = createMuiTheme(themeFile);

// check for login token in local storage
const token = localStorage.FBIdToken;
let authenticated;
// if token exists, check for expiration date
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 > Date.now()) {
    authenticated = true;
  } else {
    authenticated = false;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" component={home} />
              <Route path="/form" component={anncForm} />
              <AuthRoute path="/admin" component={admin} />
              <AuthRoute
                path="/admin-login"
                component={adminLogin}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
