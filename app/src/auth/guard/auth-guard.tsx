import { useEffect, useCallback, useState } from "react";
import { useAuthContext } from "src/hooks/auth";
import { useRouter } from "src/hooks/router";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  const { user, loading } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!user && !loading) {
      router.push("/");
    } else {
      setChecked(true);
    }
  }, [user, router]);

  useEffect(() => {
    check();
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
