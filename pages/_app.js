import '../src/styles/globals.css';

import Head from 'next/head';
import NextTopLoader from 'nextjs-toploader';
import { store } from '../src/stores/index';
import { Provider } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>User Management System</title>
        <meta
          name="viewport"
          content="initial-scale=1, minimum-scale=1, maximum-scale=2.0, user-scalable=yes"
        />
      </Head>
      <NextTopLoader showSpinner={false} />
      <Provider store={store}>
        <main>
          <Component {...pageProps} suppressHydrationWarning={true} />
        </main>
        <Toaster
          toastOptions={{
            success: {
              iconTheme: {
                primary: '#33a34e',
                secondary: 'white',
              },
              className: 'custom_toast_css_success',
              duration: 2000,
              position: 'top-right',
            },
            error: {
              iconTheme: {
                primary: 'red',
                secondary: 'white',
              },
              className: 'custom_toast_css',
              duration: 4000,
              position: 'top-right',
            },
          }}
          onDismiss={(toast) => {
            document
              .querySelector('.custom_toast_css')
              .classList.remove('close_toast_animation');
          }}
        >
          {(t) =>
            t?.type == 'success' ? (
              <div className="custom_toast_css_success show_toast">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    setTimeout(() => {
                      document.getElementById(t.id)?.remove();
                    }, 1000);
                    document
                      .querySelector('.custom_toast_css_success')
                      .classList.add('close_toast_animation');
                  }}
                >
                  <IconCircleCheck color="green" />
                </button>
                <span className="ms-2">{t.message}</span>
              </div>
            ) : (
              <div className="custom_toast_css show_toast">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    setTimeout(() => {
                      document.getElementById(t.id)?.remove();
                    }, 1000);
                    document
                      .querySelector('.custom_toast_css')
                      .classList.add('close_toast_animation');
                  }}
                >
                  <IconCircleX color="red" />
                </button>
                <span className="ms-2">{t.message}</span>
              </div>
            )
          }
        </Toaster>
      </Provider>
    </>
  );
}

export default MyApp;
