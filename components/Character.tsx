//@ts-ignore
import { checkEmptyList,errorMessage , checkId} from "../global_func/func.ts";
import styles from "../styles/Films.module.scss"
import Link from 'next/link'
import { CurrentCharacter,CurrentFilm, CurrentPlanet,Character, CurrentStarship} from "../types/type";


type Props = {
  character:Array<CurrentCharacter>,
  planets:Array<CurrentPlanet>,
  FilmsList:Array<CurrentFilm>,
  starshipsList:Array<CurrentStarship>,
  charactersList:Array<Character>
}

const Character:React.FC<Props>  = ({character,planets,FilmsList,starshipsList,charactersList})=>{


const {name,gender,hair_color,height,mass,homeworld,films,starships,url} = character[0].data;


    return(
<>
    <div>
         <div className={`${styles.HeadlineLinks} ${styles.MainName}`}>{name} </div>
        <div><strong className={styles.HeadlineLinks}>Gender</strong><span className={styles.FieldValue}> - {gender}</span></div>
        <div><strong className={styles.HeadlineLinks}>Hair color</strong><span className={styles.FieldValue}> - {hair_color}</span></div>
        <div><strong className={styles.HeadlineLinks}>Height</strong><span className={styles.FieldValue}> - {height} cm</span></div>
        <div><strong className={styles.HeadlineLinks}>Mass</strong><span className={styles.FieldValue}> -  {mass} kg</span></div> 
        <div><strong className={styles.HeadlineLinks}>Homeworld</strong> :  {
        
        checkId(planets,homeworld)?

        planets?.map(doc => (
      //@ts-ignore     
        doc.data().url === homeworld && <Link href={`/planets/${doc.data().url}`}  key={doc.data().url}><a className={styles.elementSearching}>{doc.data().name}</a></Link> 
        )) : <span className={styles.elementSearchingError}>{errorMessage()}</span>}
        </div>  

    </div> 

    <div> 
    <strong className={styles.HeadlineLinks}> Films :</strong> {
   
   checkEmptyList( FilmsList,films) ?
   FilmsList.map(doc=>
    //@ts-ignore
    films.includes(doc.data().url) &&
     //@ts-ignore
  <span key={doc.data().url} className={styles.elementSearching}>
    {/* @ts-ignore */}
    <Link href={`/films/${doc.data().episode_id}`}><a>{doc.data().title} </a></Link></span> 
    ) : <span className={styles.elementSearchingError}>{errorMessage()}</span> } 
     </div>

    
     <div> <strong className={styles.HeadlineLinks}>Starships </strong>: 
    
    
    {
  checkEmptyList(starshipsList,starships) ?
    
  starshipsList.map(doc=>
       //@ts-ignore
        starships.includes(doc.data().url) &&
           //@ts-ignore
 <span key={doc.data().url} className={styles.elementSearching}>
   {/*    @ts-ignore */}
  <Link href={`/starships/${doc.data().url}`}><a>{doc.data().name}</a></Link></span> 
  
    ) : <span className={styles.elementSearchingError}>{errorMessage()}</span>}   </div>  
   



<div> <strong className={styles.HeadlineLinks}> Other characters: </strong>: {charactersList?.map(doc=>
     //@ts-ignore
 doc.data().url !== url &&
  //@ts-ignore
  <span key={doc.data().url} className={styles.elementSearching}>
  {/* @ts-ignore */}
     <Link href={`/characters/${doc.data().url}`}><a>{doc.data().name} </a></Link></span> 
   
    )}  </div>  


</>
    )
}



export default Character;