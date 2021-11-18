import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";
import Saved from "./pages/Saved";
import UserProfile from "./pages/UserProfile";

export default class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
                <Route path="/auth" component={Authentication} />

                <Route path={['/catalog', '/productdetails', '/saved', '/profile']}>
                    <Layout authenticated>
                        <Switch>
                            <ProtectedRoute path="/catalog" component={Catalog} exact />
                            <ProtectedRoute path="/productdetails" component={ProductDetails} />
                            <ProtectedRoute path="/saved" component={Saved} />
                            <ProtectedRoute path="/profile" component={UserProfile} />
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