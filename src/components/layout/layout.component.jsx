import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../navigation/navigation.component";
import Footer from "../footer/footer.component";
import "./layout.styles.scss";

const Layout = () => {
  return (
    <div className="layout">
      <Navigation />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
