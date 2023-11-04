/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useReducer, useCallback, useMemo } from "react";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
// config
import { FIREBASE_API } from "src/config";
import { ActionMapType, AuthStateType, AuthUserType } from "../types";
import { AuthContext } from "./auth-context";

export const firebaseApp = initializeApp(FIREBASE_API);

export const AUTH = getAuth(firebaseApp);

export const DB = getFirestore(firebaseApp);

export const STORAGE = getStorage(firebaseApp);

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

  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          dispatch({
            type: Types.INITIAL,
            payload: {
              user: {
                ...user,
                id: user.uid,
              },
            },
          });
          const userProfile = doc(DB, "users", user.uid);
          const profileData = doc(DB, "profiles", user.uid);

          const docSnap = await getDoc(userProfile);
          const profileSnap = await getDoc(profileData);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const profile: any = { ...docSnap.data(), ...profileSnap.data() };
          dispatch({
            type: Types.INITIAL,
            payload: {
              user: {
                ...user,
                ...profile,
                displayName: `${profile.firstName || ""} ${
                  profile.lastName || ""
                }`,
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
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(
    async (email: string, password: string): Promise<UserCredential> => {
      return signInWithEmailAndPassword(AUTH, email, password); // Ensure this returns a UserCredential.
    },
    []
  );

  const refreshUser = useCallback(async () => {
    await initialize();
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
