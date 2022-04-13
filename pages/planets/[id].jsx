import styles from '../../styles/Films.module.scss';
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from 'react-firebase-hooks/firestore';
import Link from 'next/link'

export const getServerSideProps = async(context)=>{

  let planet = []
  
  const {id} = context.params;
  
  
  const querySnapshot = await firebase.firestore()
  .collection('planets')
  .where("url","==", id)
  .get();


  querySnapshot.forEach(function (doc) {
    planet.push({
      data: doc.data(),
    })
  })

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

 
climate: "arid"
created: "2014-12-09T13:50:49.641000Z"
diameter: "10465"
edited: "2014-12-20T20:58:18.411000Z"
films: (5) ['1', '3', '4', '5', '6']
gravity: "1 standard"
name: "Tatooine"
orbital_period: "304"
population: "200000"
residents: (10) ['1', '2', '4', '6', '7', '8', '9', '11', '43', '62']
rotation_period: "23"
surface_water: "1"
terrain: "desert"
uid: "07827265798731"
url: "1"



const CurrentPlanet = ({planet,id}) => {

    const {data} = planet[0];
  

//console.log(data)


const [films,filmsLoading,filmsLoadingError]= useCollection(
  firebase.firestore().collection("films"),{}
)

const [planets,planetsLoading,planetsLoadingError]= useCollection(
  firebase.firestore().collection("planets"),{}
)



// const [starships,starshipsLoading,starshipsLoadingError]= useCollection(
//   firebase.firestore().collection("starships"),{}
// )

  return (
  <main>

  <div className={styles.container}>
     <Navbar />

      <section className={styles.mainBlock}>
      <section>SEARCH ZONE</section>
        <h1>Planet</h1>
  <div><strong>Current Planet #{id}</strong> -{data?.name}</div>
  <div><strong>Climate</strong> - {data?.climate} </div>
  <div><strong>Population</strong> - {data?.population}</div>
  <div><strong>Terrain</strong> - {data?.terrain}</div>
  <div><strong>Gravity</strong> - {data?.gravity}</div>
  
    <br/>

  <div> 
    <strong> Films :</strong> {films?.docs?.map(doc=>
  data.films.includes(doc.data().url) ?
  <span key={doc.data().url}>
    <Link href={`/films/${doc.data().url}`}><a>{doc.data().title} </a></Link> (#{doc.data().url})  </span> 
    : console.log(doc.data().url) )} 
     </div>

     <br/>

     <div> <strong>Other planets: </strong>: {planets?.docs?.map(doc=>
  doc.data().url !== id ?
  <span key={doc.data().url}>
   <Link href={`/planets/${doc.data().url}`}><a>{doc.data().name} </a></Link> - (#{doc.data().url})  </span> 
   
   : console.log(doc.data().url) )}  </div>  

    
      </section>


  </div>



</main>
    
  )
}



export default CurrentPlanet;