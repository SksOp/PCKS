/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useReducer, useCallback, useMemo } from "react";

import {
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

import { ActionMapType, AuthStateType, AuthUserType } from "../types";
import { AuthContext } from "./auth-context";
import { firebaseApp } from "src/firebase";
import { validateAdmin } from "src/utils/admin";
import { useSnackbar } from "notistack";

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
  const snackBar = useSnackbar();
  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(AUTH, provider);
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut(AUTH);
  }, []);

  // ----------------------------------------------------------------------
  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          const isAdmin = await validateAdmin(user);
          if (!isAdmin) {
            snackBar.enqueueSnackbar("You are not admin", { variant: "error" });
            await logout();
            return;
          }
          dispatch({
            type: Types.INITIAL,
            payload: {
              user: {
                ...user,
                id: user.uid,
              },
            },
          });
        } else {
          dispatch({
            type: Types.INITIAL,
            payload: {
              user: null,
            },
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const refreshUser = useCallback(async () => {
    // await initialize();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "firebase",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      logout,
      loginWithGoogle,
      refreshUser,
    }),
    [loginWithGoogle, status, state.user, logout, refreshUser]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
