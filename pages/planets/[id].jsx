import styles from '../../styles/Films.module.scss';
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from 'react-firebase-hooks/firestore';
import Head from 'next/head'
import Search from "../../components/Search";
import Planet from '../../components/Planet';
import { get } from '../../global_func/func';

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