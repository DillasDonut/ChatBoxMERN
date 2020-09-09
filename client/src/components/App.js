import React, { Suspense } from 'react';
import {  Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages routing
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import ChatPage from "./views/ChatPage/ChatPage"
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import Test from "./views/Test/Test";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div className="content_wrapper">
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/chat" component={Auth(ChatPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/test" component={Auth(Test, null)} />

        </Switch>
      </div>
    </Suspense>
  );
}
export default App;

