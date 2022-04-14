import styles from '../../styles/Films.module.scss';
import Navbar from "../../components/Nav";
import firebase from "../../firebase/db";
import { useCollection } from 'react-firebase-hooks/firestore';
import Link from 'next/link'
import Search from "../../components/Search";
export const getServerSideProps = async(context)=>{

  let starship = []
  
  const {id} = context.params;
  
  
  const querySnapshot = await firebase.firestore()
  .collection('starships')
  .where("url","==", id)
  .get();


  querySnapshot.forEach(function (doc) {
    starship.push({
      data: doc.data(),
    })
  })

  if(!starship.length) {
    return{
      notFound:true,
    }
  }

return{
    props:{
      starship ,
      id, 
    
    }
  }
}

MGLT: "20"
cargo_capacity: "19000000"
consumables: "6 months"
cost_in_credits: "unknown"
created: "2014-12-15T12:34:52.264000Z"
crew: "6"
edited: "2014-12-20T21:23:49.895000Z"
films: (2) ['2', '3']
hyperdrive_rating: "4.0"
length: "90"
manufacturer: "Gallofree Yards, Inc."
max_atmosphering_speed: "650"
model: "GR-75 medium transport"
name: "Rebel transport"
passengers: "90"
pilots: []
starship_class: "Medium transport"
uid: "19bnL3LNs9C502"
url: "17"



const CurrentStarship = ({starship,id}) => {

const {data} = starship[0];
  
console.log(data)


const [films,filmsLoading,filmsLoadingError]= useCollection(
  firebase.firestore().collection("films"),{}
)

const [characters,charactersLoading,charactersLoadingError]= useCollection(
  firebase.firestore().collection("characters"),{}
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
        <h1>Starship</h1>
  <div><strong>Current Starship #{id}</strong> - {data?.name}</div>
  <div><strong>Model</strong> - {data?.model} </div>
  <div><strong>Manufacturer</strong> - {data?.manufacturer}</div>
  <div><strong>Class</strong> - {data?.starship_class}</div>
  <div><strong>Passengers</strong> - {data?.passengers}</div>
  <div><strong>Crew</strong> - {data?.crew}</div>
  
    <br/>

    <div><strong>Films :</strong> {films?.docs?.map(doc=>
  data.films.includes(doc.data().url) ?
  <span key={doc.data().url}>
    <strong><Link href={`/films/${doc.data().url}`}><a>{doc.data().title}</a></Link> - {doc.data().url} | 
    </strong></span> : console.log(doc.data().url) )}  </div>

     <br/>

  <div><strong>Pilots :</strong> {characters?.docs?.map(doc=>
  data.pilots.includes(doc.data().url) ?
  <span key={doc.data().url}>
    <strong><Link href={`/characters/${doc.data().url}`}><a>{doc.data().name}</a></Link> - {doc.data().url} | 
    </strong></span> : console.log(doc.data().url) )}  </div>

<br/>

    <div> 
    <strong> Other starships :</strong> {starships?.docs?.map(doc=>
  <span key={doc.data().url}>
    <Link href={`/starships/${doc.data().url}`}><a>{doc.data().name} </a></Link> (#{doc.data().url})  </span> 
 )} 
     </div>

      </section>
  </div>
</main>
    
  )
}

export default CurrentStarship;