import styles from '../../styles/Films.module.scss';
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from 'react-firebase-hooks/firestore';
import Search from "../../components/Search";
import Character from '../../components/Character';
import Head from 'next/head'
import { get } from '../../global_func/func';

export const getServerSideProps = async(context)=>{

const {id} = context.params;

let characters = await get(id,"characters","url",firebase)

if(!characters.length) {
  return{
    notFound:true,
  }
}

return{
  props:{
    characters ,
    id, 
  
  }
}
}

const CurrentCharacters = ({characters,id}) => {
  
 
  const {data} = characters[0]

 const [planets,planetsLoading,planetsLoadingError]= useCollection(
  firebase.firestore().collection("planets"),{}
)

const [films,filmsLoading,filmsLoadingError]= useCollection(
  firebase.firestore().collection("films"),{}
)

const [starships,starshipsLoading,starshipsLoadingError]= useCollection(
  firebase.firestore().collection("starships"),{}
)


const [charactersDB,charactersLoading,charactersLoadingError]= useCollection(
  firebase.firestore().collection("characters"),{}
)



  return (


  <main>
<Head>
        <title>Character - {data?.name}</title>
</Head>

  <div className={styles.container}>
     <Navbar />
      <section className={styles.mainBlock}>
      <Search/>
  <Character character ={characters} planets={planets?.docs} FilmsList ={films?.docs} starshipsList={starships?.docs} charactersList={charactersDB?.docs}/>
       </section>
  </div>
</main>
    
  )
}



export default CurrentCharacters;