import React from "react";
import Navbar from "./navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}

export default Layout;
