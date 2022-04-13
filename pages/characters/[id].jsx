import styles from '../../styles/Films.module.scss';
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from 'react-firebase-hooks/firestore';
import Link from 'next/link'

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
  const {data} = characters[0];
  




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



// birth_year: "57BBY"
// created: "2014-12-10T16:16:29.192000Z"
// edited: "2014-12-20T21:17:50.325000Z"
// eye_color: "blue-gray"
// films: (6) ['1', '2', '3', '4', '5', '6']
// gender: "male"
// hair_color: "auburn, white"
// height: "182"
// homeworld: "20"
// mass: "77"
// name: "Obi-Wan Kenobi"
// skin_color: "fair"
// species: []
// starships: (5) ['48', '59', '64', '65', '74']
// uid: "5m96e3RJydwWKM"
// url: "10"

  return (


  <main>

  <div className={styles.container}>
     <Navbar />

      <section className={styles.mainBlock}>
      <section>SEARCH ZONE</section>
        <h1>Character</h1>
        <div><strong>Current Characters (#{id})</strong> - {data?.name} </div>
  <div><strong>Gender</strong> - {data?.gender}</div>
  <div><strong>Hair color</strong> - {data?.hair_color}</div>
  <div><strong>Height</strong> - {data?.height} </div>
  <div><strong>Mass</strong> -  {data?.mass}</div> 
  <div><strong>Homeworld</strong> :  {planets?.docs?.map(doc => (

  doc.data().url === data.homeworld ?<Link href={`/planets/${doc.data().url}`}><a key={doc.data().url}> {doc.data().name} </a></Link> : console.log(doc.data().url + "|" + data.homeworld)
  ))}
  </div> 


    <div> 
    <strong> Films :</strong> {films?.docs?.map(doc=>
  data.films.includes(doc.data().url) ?
  <span key={doc.data().url}>
    <Link href={`/films/${doc.data().url}`}><a>{doc.data().title} </a></Link> (#{doc.data().url})  </span> 
    : console.log(doc.data().url) )} 
     </div>

    

    <div> <strong>Starships </strong>: {starships?.docs?.map(doc=>
  data.starships.includes(doc.data().url) ?
  <span key={doc.data().url}>
   <Link href={`/starships/${doc.data().url}`}><a>{doc.data().name} </a></Link> - (#{doc.data().url})  </span> 
   
   : console.log(doc.data().url) )}  </div>  
    
    <div> <strong>Other characters: </strong>: {charactersDB?.docs?.map(doc=>
  doc.data().url !== id ?
  <span key={doc.data().url}>
   <Link href={`/characters/${doc.data().url}`}><a>{doc.data().name} </a></Link> - (#{doc.data().url})  </span> 
   
   : console.log(doc.data().url) )}  </div>  


       </section>


  </div>



</main>
    
  )
}



export default CurrentCharacters;