import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";


const PrivateRoute = ({ children, ...remainingProps }) => {
    console.log(useSelector(state => state.firebase.auth))
    const auth = useSelector(state => state.firebase.auth);
  return (

    <Route
      {...remainingProps}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;