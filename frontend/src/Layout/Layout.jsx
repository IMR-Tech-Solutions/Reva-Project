import React, { useEffect } from "react";
import Header from "../Component/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Component/Footer";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
