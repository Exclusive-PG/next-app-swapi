import {useCollection} from "react-firebase-hooks/firestore"
import firebase from "../../firebase/db";
import styles from '../../styles/Films.module.scss';
import Navbar from "../../components/Nav";
import React from 'react'



export default function Films() {


  return (
  
      <main>
        <div className={styles.container}>
           <Navbar />
            <section className={styles.mainBlock}>
              <section>SEARCH ZONE</section>
                <h1>Films</h1>
                  
            </section>


        </div>



      </main>


  )
}