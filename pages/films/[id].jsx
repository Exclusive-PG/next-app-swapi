import styles from '../../styles/Films.module.scss';
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from 'react-firebase-hooks/firestore';
import Link from 'next/link'
import Search from "../../components/Search";
import Film from '../../components/Film';
import { checkEmptyList, errorMessage } from './../../global_func/func';


export const getServerSideProps = async(context)=>{
  let films = []
  const {id} = context.params;
  const querySnapshot = await firebase.firestore()
  .collection('films')
  .where("episode_id","==", parseInt(id))
  .get();
  querySnapshot.forEach(function (doc) {
    films.push({
      data: doc.data(),
    })
  })

  if(!films.length) {
    return{
      notFound:true,
    }
  }

return{
    props:{
      films ,
      id, 
    
    }
  }
}

 
const CurrentFilm = ({films,id}) => {
  const {data} = films[0];

const [characters,Loading,LoadingError]= useCollection(
  firebase.firestore().collection("characters"),{}
)
const [planets,planetsLoading,planetsLoadingError]= useCollection(
  firebase.firestore().collection("planets"),{}
)
const [starships,starshipsLoading,starshipsLoadingError]= useCollection(
  firebase.firestore().collection("starships"),{}
)
  return (
  <main>

  <div className={styles.container}>
     <Navbar />

      <section className={styles.mainBlock}>
      <Search/>
      <Film data ={data}/>
  
  <br/>
  <div><div className={styles.HeadlineLinks}>Characters :</div> {
  
  checkEmptyList(characters?.docs, data?.characters) ?

  characters?.docs?.map(doc=>data.characters.includes(doc.data().url) &&

  <span key={doc.data().url} className={styles.elementSearching}>  <Link href={`/characters/${doc.data().url}`}>{doc.data().name}</Link>  </span>  
   
   ) : <span  className={styles.elementSearchingError}>{errorMessage()}</span> }  </div>
    
    <br/>



    <div><div className={styles.HeadlineLinks}>Planets :</div> {

      checkEmptyList(planets?.docs, data?.planets) ?

    planets?.docs?.map(doc=> data.planets.includes(doc.data().url) &&

   <span key={doc.data().url} className={styles.elementSearching}>  <Link href={`/planets/${doc.data().url}`}>{doc.data().name}</Link> </span>  )
  
  : <span  className={styles.elementSearchingError}>{errorMessage()}</span>  }</div>
    
    <br/>
    
    

    <div><div className={styles.HeadlineLinks}>Starships :</div> { 
     checkEmptyList(starships?.docs, data?.starships) ?

     starships?.docs?.map(doc=>data.starships.includes(doc.data().url) &&
     
    <span key={doc.data().url} className={styles.elementSearching}><Link href={`/starships/${doc.data().url}` } >{doc.data().name}</Link> </span> ) 
    
    : <span  className={styles.elementSearchingError}>{errorMessage()}</span> }  </div>
    
      </section>


  </div>
</main>
    
  )
}

export default CurrentFilm;