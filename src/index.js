/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import UserProvider from "./providers/UserProvider";
import InsertName from "views/credentials/InsertName";
import APIKeyProvider from "providers/APIKeyProvider";
import Login from "views/Login";
import Register from "views/Register";

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <UserProvider>
          <APIKeyProvider>
            <Switch>
              <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
              />
              <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
              <Route
                path="/insert-name"
                render={(props) => <InsertName {...props} />}
              />
              <Route path="/login" render={(props) => <Login {...props} />} />
              <Route
                path="/register"
                render={(props) => <Register {...props} />}
              />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </APIKeyProvider>
        </UserProvider>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById("root")
);
