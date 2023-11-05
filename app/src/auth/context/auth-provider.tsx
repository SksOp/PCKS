/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useReducer, useCallback, useMemo } from "react";

import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// config
import { FIREBASE_API } from "src/config";
import { ActionMapType, AuthStateType, AuthUserType } from "../types";
import { AuthContext } from "./auth-context";
import { DB, firebaseApp } from "src/firebase";

export const AUTH = getAuth(firebaseApp);

// ----------------------------------------------------------------------

enum Types {
  INITIAL = "INITIAL",
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
};

type Action = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: Action) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // LOGIN
  const login = useCallback(
    async (email: string, password: string): Promise<UserCredential> => {
      return signInWithEmailAndPassword(AUTH, email, password); // Ensure this returns a UserCredential.
    },
    []
  );

  const refreshUser = useCallback(async () => {
    // await initialize();
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut(AUTH);
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user?.emailVerified
    ? "authenticated"
    : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "firebase",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      login,
      logout,
      refreshUser, // Include the refreshUser function here
    }),
    [
      status,
      state.user,
      login,
      logout,
      refreshUser, // Make sure this is also included in the dependency array if it uses any external state or props
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
