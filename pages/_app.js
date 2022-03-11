import { AuthProvider } from '../contexts/AuthContext'
import '../styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

function MyApp({ Component, pageProps }) {
  return <AuthProvider><Component {...pageProps} /></AuthProvider>
}

export default MyApp
