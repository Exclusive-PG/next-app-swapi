import styles from '../../styles/Films.module.scss';
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from 'react-firebase-hooks/firestore';
import Search from "../../components/Search";
import Character from '../../components/Character';
import Head from 'next/head'

export const getServerSideProps = async(context)=>{

  let characters = []
  
  const {id} = context.params;

  const querySnapshot = await firebase.firestore()
  .collection('characters')
  .where("url","==", id)
  .get();


  querySnapshot.forEach(function (doc) {
    characters.push({
      data: doc.data(),
    })
  })

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
  
  console.log(characters)
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

 
    

{/* <div> <strong>Other characters: </strong>: {charactersDB?.docs?.map(doc=>
 
 doc.data().url !== id ?
  
  <span key={doc.data().url}>
     <Link href={`/characters/${doc.data().url}`}><a>{doc.data().name} </a></Link> - (#{doc.data().url}) 
  </span> 
   
   : console.log(doc.data().url) )}  </div>   */}


       </section>


  </div>



</main>
    
  )
}



export default CurrentCharacters;