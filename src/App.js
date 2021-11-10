import React, { Component } from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";

export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
                <Route path="/auth" component={Authentication} />

                <Route path={['/catalog', '/productdetails']}>
                    <Layout authenticated>
                        <Switch>
                            <ProtectedRoute path="/catalog" component={Catalog} exact />
                            <ProtectedRoute path="/productdetails" component={ProductDetails} />
                        </Switch>
                    </Layout>
                </Route>

                {/*used for the root "/" and will be greedy so need it after everything*/}
                <Route path={['/404', '/']}>
                    <Layout>
                        <Switch>
                            <Route path="/" component={Home} exact />
                            <Route path="/404" component={Home} />
                        </Switch>
                    </Layout>
                </Route>
            </Switch>
        </Router>
    );
  }
}