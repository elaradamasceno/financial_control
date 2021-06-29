import React from "react";
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from "../pages/Dashboard";
import List from "../pages/List";
import Layout from "../components/Layout";

const AppRoutes: React.FC = () => {
  return(
    <Layout>
      <BrowserRouter>      
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/list/:type" exact component={List} />
        </Switch>
      </BrowserRouter>
    </Layout>
  )
}

export default AppRoutes;