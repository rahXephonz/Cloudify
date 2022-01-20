import GlobalStyles from "@styles/global.styles";
import React, { ReactNode } from "react";
import Footer from "./components/FooterComponents/Footer";
import Header from "./components/HeaderComponents/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <React.Fragment>
      <GlobalStyles />
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
