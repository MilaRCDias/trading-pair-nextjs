import React from 'react';
import  Head  from 'next/head';

const MyApp=({ Component, pageProps }) =>{

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
