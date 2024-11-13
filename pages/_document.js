import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = () => (
  <Html lang="en">
    <Head>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
        crossOrigin="anonymous"
        async
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
        integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
        crossOrigin="anonymous"
        async
      ></script>
      <link
        href="https://cdn.assets.pluto-service.com/lib/quill/quill.snow.css"
        rel="stylesheet"
      />
      <link href="/plutostrap/dist/css/bootstrap.min.css" rel="stylesheet" />
      <script src="/plutostrap/dist/js/bootstrap.min.js" async></script>

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://cdn.assets.pluto-service.com/patient-web-clients/pluto/logo-32.png"
        sizes="32x32"
      ></link>
      <link
        rel="icon"
        type="image/png"
        href="https://cdn.assets.pluto-service.com/patient-web-clients/pluto/favicon-16x16.png"
        sizes="16x16"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MyDocument;
