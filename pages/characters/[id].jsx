import styles from '../../styles/Films.module.scss';
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from 'react-firebase-hooks/firestore';
import Link from 'next/link'
import { checkEmptyList, errorMessage } from './../../global_func/func';
import Search from "../../components/Search";
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

  <div className={styles.container}>
     <Navbar />

      <section className={styles.mainBlock}>
      <Search/>
        <h1>Character</h1>
        <div><strong>Current Characters (#{id})</strong> - {data?.name} </div>
  <div><strong>Gender</strong> - {data?.gender}</div>
  <div><strong>Hair color</strong> - {data?.hair_color}</div>
  <div><strong>Height</strong> - {data?.height} </div>
  <div><strong>Mass</strong> -  {data?.mass}</div> 
  <div><strong>Homeworld</strong> :  {planets?.docs?.map(doc => (

  doc.data().url === data.homeworld ?<Link href={`/planets/${doc.data().url}`}  key={doc.data().url}><a> {doc.data().name} </a></Link> : ""
  ))}
  </div> 


    <div> 
    <strong> Films :</strong> {
   
   checkEmptyList( films?.docs,data?.films) ?
    films?.docs?.map(doc=>
  data.films.includes(doc.data().url) &&
  <span key={doc.data().url}>
    <Link href={`/films/${doc.data().url}`}><a>{doc.data().title} </a></Link> (#{doc.data().url})  </span> 
    ) : errorMessage() } 
     </div>

    

    <div> <strong>Starships </strong>: 
    
    
     {
   checkEmptyList( starships?.docs,data?.starships) ?
     
     starships?.docs?.map(doc=>
  data.starships.includes(doc.data().url) &&
  <span key={doc.data().url}>
   <Link href={`/starships/${doc.data().url}`}><a>{doc.data().name} </a></Link> - (#{doc.data().url})  </span> 
   
     ) : errorMessage()}   </div>  
    
    

<div> <strong>Other characters: </strong>: {charactersDB?.docs?.map(doc=>
 
 doc.data().url !== id ?
  
  <span key={doc.data().url}>
     <Link href={`/characters/${doc.data().url}`}><a>{doc.data().name} </a></Link> - (#{doc.data().url}) 
  </span> 
   
   : console.log(doc.data().url) )}  </div>  


       </section>


  </div>



</main>
    
  )
}



export default CurrentCharacters;