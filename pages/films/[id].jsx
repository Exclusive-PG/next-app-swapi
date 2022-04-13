import styles from '../../styles/Films.module.scss';
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from 'react-firebase-hooks/firestore';
import Link from 'next/link'

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
  
  let counter = 0;



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
      <section>SEARCH ZONE</section>
        <h1>Film</h1>
        <div><strong>CURRENT FILM {id}</strong> - {data?.title}</div>
  <div><strong>Producer</strong> - {data?.producer}</div>
  <div><strong>Created</strong> - {data?.created}</div>
  <div><strong>Director</strong> - {data?.director}</div>
  <div><strong>Opening crawl</strong> -  {data?.opening_crawl}</div>
  
  <br/>
  <div>Characters : {characters?.docs?.map(doc=>
  data.characters.includes(doc.data().url) ?
  <span key={doc.data().url}>
    <strong><Link href={`/characters/${doc.data().url}`}>{doc.data().name}</Link> - {doc.data().url} | 
    </strong></span> : console.log(doc.data().url) )}  </div>
    
    <br/>

    <div>Planets : {planets?.docs?.map(doc=>
  data.planets.includes(doc.data().url) ?
  <span key={doc.data().url}>
    <strong><Link href={`/planets/${doc.data().url}`}>{doc.data().name}</Link> - {doc.data().url} | 
    
    </strong></span> : console.log(doc.data().url) )}  </div>
    
    <br/>
    
    <div>Starships : {starships?.docs?.map(doc=>
  data.starships.includes(doc.data().url) ?
  <span key={doc.data().url}>
    <strong><Link href={`/starships/${doc.data().url}`}>{doc.data().name}</Link> - {doc.data().url} | 
    </strong></span> : console.log(doc.data().url) )}  </div>
    
      </section>


  </div>



</main>
    
  )
}



export default CurrentFilm;