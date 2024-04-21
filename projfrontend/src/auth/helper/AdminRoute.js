// import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";
// import { ErrorBoundary } from "react-error-boundary";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() && isAutheticated().user.role === 1 ? (
          // <ErrorBoundary fallback="Something went wrong">
          <Component {...props} />
        ) : (
          // </ErrorBoundary>
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
