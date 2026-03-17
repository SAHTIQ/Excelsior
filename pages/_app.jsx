import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { applyTheme, getStoredTheme } from '../lib/theme';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
