import type { AppProps } from "next/app";

import { Global } from "@emotion/react";
import globalStyle from "styles/globalStyle";
import Layout from "components/Layout";
import NextHead from "components/Head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyle} />
      <NextHead />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
