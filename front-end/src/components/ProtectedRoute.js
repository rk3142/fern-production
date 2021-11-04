import React from 'react';
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({component: Component, ...restOfProps}) {
    const token = localStorage.getItem("auth_token");
    const isAuthenticated = token && token.length > 0

    return (
        <Route
            {...restOfProps}
              render={(props) =>
                    isAuthenticated ? <Component {...props} /> : <Redirect to="/auth" />
              }
        />
    );
}

export default ProtectedRoute;