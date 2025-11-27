// pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Press_Start_2P, Outfit } from 'next/font/google'
import Layout from '@/components/Layout'
import { Toaster } from 'react-hot-toast' // Import Toaster

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  variable: '--font-press-start',
  weight: '400',
});
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${pressStart2P.variable} ${outfit.variable}`}>
      <Layout>
        <Component {...pageProps} />
        <Toaster // Add Toaster component here
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </Layout>
    </main>
  )
}