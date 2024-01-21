import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
export function useAuthStatus() {
  const [login, setLogin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      }
      setCheckingStatus(false);
    });
  }, []);
  return { login, checkingStatus };
}
