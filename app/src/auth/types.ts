import { UserCredential } from "firebase/auth";

// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = null | Record<string, unknown>;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

// ----------------------------------------------------------------------

type CanRemove = {
  loginWithGoogle?: () => Promise<void>;
  logout: () => Promise<void>;
};

export type FirebaseContextType = CanRemove & {
  user: AuthUserType;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  refreshUser: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
};

// ----------------------------------------------------------------------
