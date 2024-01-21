import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

export default function PrivateRoute() {
  const { login, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <h3>Loading...</h3>;
  }

  return login ? <Outlet /> : <Navigate to="/Sign" />;
}
