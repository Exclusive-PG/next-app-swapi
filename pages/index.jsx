import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import {useState} from 'react'
import Link from 'next/link'

export default function Home() {

  const [burgerMenu,setBurgerMenu] = useState(false);



  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="SWAPI Next App" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
      </Head>

      <main className={styles.main}>
        <div className = {styles.backgroundPoster}></div>
        
        <section className={styles.main_wrapper}>
            <div className={`${styles.block_center} `}>
                <div className={`${styles.content} `}>
                 
                <div className={`${styles.hamburger} ${styles.c_hamburger} ${burgerMenu && styles.open}`} onClick={()=> setBurgerMenu(!burgerMenu)}>
                    <span className={`${styles.c_hamburger__line}`}></span>
                    <span className={`${styles.c_hamburger__line}`}></span>
                    <span className={`${styles.c_hamburger__line}`}></span>
                </div>

                <Link href={'/films'} ><button type="button" className={`${styles.entered_button}`}>Get started</button></Link>
               
                </div>

            </div>
        </section>
      </main>
    </div>
    </>
  )
}
