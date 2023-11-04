import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams as defaultUseSearchParams } from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
    }),
    [navigate]
  );

  return router;
}
export function useSearchParams() {
  const [searchParams] = defaultUseSearchParams();

  return useMemo(() => searchParams, [searchParams]);
}
