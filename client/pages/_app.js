import "@/styles/globals.css";
import { AuthProvider } from '../lib/authcontext';

export default function App({ Component, pageProps }) {
  return ( 
    <AuthProvider>
    <Component {...pageProps} />
    </AuthProvider>
  );
}
