import React from "react";
import type { NextPage } from "next";
import SEO from "@components/Metadata/SEO";

const Home: NextPage = () => {
  return (
    <div className="wrapper">
      <SEO title="Welcome" />
      <h1>We Make Something Interest</h1>
    </div>
  );
};

export default Home;
