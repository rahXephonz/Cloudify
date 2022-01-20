import React from "react";
import { AppProps } from "next/app";
import Layout from "@layout/Layout";
import GlobalStyles from "@styles/global.styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
