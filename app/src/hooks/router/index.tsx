import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams as defaultUseSearchParams } from "react-router-dom";
import { useLocation, matchPath } from "react-router-dom";

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

type ReturnType = boolean;

export function useActiveLink(path: string, deep = true): ReturnType {
  const { pathname } = useLocation();

  const normalActive = path
    ? !!matchPath({ path, end: true }, pathname)
    : false;

  const deepActive = path ? !!matchPath({ path, end: false }, pathname) : false;

  return deep ? deepActive : normalActive;
}
