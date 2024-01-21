import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

export default function PrivateRoute() {
  const { login, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }

  return login ? <Outlet /> : <Navigate to="/Sign" />;
}
