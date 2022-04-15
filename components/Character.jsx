import { checkEmptyList,errorMessage , checkId} from "../global_func/func";
import styles from "../styles/Films.module.scss"
import Link from 'next/link'



const Character = ({character,planets,FilmsList,starshipsList,charactersList})=>{


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
      
        doc.data().url === homeworld && <Link href={`/planets/${doc.data().url}`}  key={doc.data().url}><a className={styles.elementSearching}>{doc.data().name}</a></Link> 
        )) : <span className={styles.elementSearchingError}>{errorMessage()}</span>}
        </div>  

    </div> 

    <div> 
    <strong className={styles.HeadlineLinks}> Films :</strong> {
   
   checkEmptyList( FilmsList,films) ?
   FilmsList.map(doc=>
    films.includes(doc.data().url) &&
  <span key={doc.data().url} className={styles.elementSearching}>
    <Link href={`/films/${doc.data().episode_id}`}><a>{doc.data().title} </a></Link></span> 
    ) : <span className={styles.elementSearchingError}>{errorMessage()}</span> } 
     </div>

    
     <div> <strong className={styles.HeadlineLinks}>Starships </strong>: 
    
    
    {
  checkEmptyList(starshipsList,starships) ?
    
  starshipsList.map(doc=>
        starships.includes(doc.data().url) &&
 <span key={doc.data().url} className={styles.elementSearching}>
  <Link href={`/starships/${doc.data().url}`}><a>{doc.data().name}</a></Link></span> 
  
    ) : <span className={styles.elementSearchingError}>{errorMessage()}</span>}   </div>  
   



<div> <strong className={styles.HeadlineLinks}> Other characters: </strong>: {charactersList?.map(doc=>
 
 doc.data().url !== url ?
  
  <span key={doc.data().url} className={styles.elementSearching}>
     <Link href={`/characters/${doc.data().url}`}><a>{doc.data().name} </a></Link></span> 
   
   : console.log(doc.data().url) )}  </div>  


</>
    )
}



export default Character;