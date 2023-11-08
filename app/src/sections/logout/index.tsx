import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "src/components/layout";
import { useAuthContext } from "src/hooks/auth";
import { paths } from "src/router";

function LogOut() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    logout();
    navigate(paths.root);
  }, []);
  return <Layout>Logging out...</Layout>;
}

export default LogOut;
