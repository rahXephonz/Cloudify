import React from "react";
import Head from "next/head";

type HelmetProps = {
  title: string;
};

const SEO = (props: HelmetProps) => {
  return (
    <Head>
      <title>
        {props.title} | Meraki, a social media apps for programmer and developer
      </title>
      <meta
        name="description"
        property="og:title"
        content="AFF Utama"
        key="Meraki, Blogpost, ioofy, rizukyy, meraki.dev"
      />
      <meta name="keywords" content="merakii, merakii, merakii.dev"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
