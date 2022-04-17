import styles from '../../styles/Films.module.scss';
import Navbar from "../../components/Nav.tsx";
import firebase from "../../firebase/db";
import { useCollection } from 'react-firebase-hooks/firestore';
import Head from 'next/head'
import Search from "../../components/Search.tsx";
import Planet from '../../components/Planet.tsx';
//@ts-ignore
import { get } from '../../global_func/func.ts';

export const getServerSideProps = async(context)=>{

  const {id} = context.params;

  let planet = await get(id,'planets',"url",firebase)
  
  if(!planet.length) {
    return{
      notFound:true,
    }
  }

return{
    props:{
      planet ,
      id, 
    
    }
  }
}

 



const CurrentPlanet = ({planet,id}) => {

    const {data} = planet[0];
  

const [films,filmsLoading,filmsLoadingError]= useCollection(
  firebase.firestore().collection("films"),{}
)

const [planets,planetsLoading,planetsLoadingError]= useCollection(
  firebase.firestore().collection("planets"),{}
)

  return (
  <main>
<Head>
        <title>Planet - {data?.name}</title>
</Head>
  <div className={styles.container}>
     <Navbar />

      <section className={styles.mainBlock}>
      <Search/>
        <Planet planet={planet} filmsList={films?.docs} planetsList={planets?.docs}/>
      </section>
  </div>
</main>
    
  )
}



export default CurrentPlanet;