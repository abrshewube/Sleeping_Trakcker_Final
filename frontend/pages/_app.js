import "../styles/globals.css";


// pages/_app.js

// import { ReactQueryProvider } from '../lib/reactQueryClient';

function MyApp({ Component, pageProps }) {
  return (
  
      <Component {...pageProps} />
   
  );
}

export default MyApp;
