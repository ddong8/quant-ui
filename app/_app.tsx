import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

function QuantApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default QuantApp;
