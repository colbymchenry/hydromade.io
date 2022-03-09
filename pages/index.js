import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import CreateAccountModal from '../components/CreateAccountModal';
import { toggleFullscreenScroll } from '../utils/modal-utils';

export default function Home() {

  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`d-flex`} style={{ position: 'absolute', 'top': '0', right: '0' }}>
        <button className="btn-black m-2" type="button" onClick={() => setShowLogin(true)}>Login</button>
        <button className="btn-black m-2" type="button" onClick={() => setShowRegister(true)}>Create Account</button>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Hydromade.io!</a>
        </h1>

        <br />
        <br />
        <br />

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Hydromade.io features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Hydromade.io projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Hydromade.io site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
    {showRegister && <CreateAccountModal close={() => {
      setShowRegister(false);
      toggleFullscreenScroll(true);
    }} />}
    </>
  )
}
